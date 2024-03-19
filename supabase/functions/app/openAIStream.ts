import {createParser, ParsedEvent, ReconnectInterval} from "eventsource-parser";

export type ChatGPTAgent = "user" | "system";
import {createClient} from "@supabase/supabase-js";
import {storeResponse} from "./databaseHandler.ts";
import {SUPABASE_ANON_API_KEY, SUPABASE_PROJECT_URL} from "../_shared/secrets.ts";
import {getUserProduct} from "../_shared/stripe/stripe.ts";
import {isTrial} from "../_shared/supabase/index.ts";
import {
    TextExceptionFeatureNotInSubscription, TextExceptionTrialOver
} from "../_shared/error/index.ts";
import {generateText} from "../_shared/text/index.ts";

export interface ChatGPTMessage {
    role: ChatGPTAgent;
    content: string;
}

export interface OpenAIStreamPayload {
    model: string;
    messages: ChatGPTMessage[];
    temperature: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
    max_tokens: number;
    stream: boolean;
    n: number;
}

export async function OpenAIStream(request: any, payload: OpenAIStreamPayload, contentType: string, responseId) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let keepRunning = true;

    const supabaseClient = createClient(
        SUPABASE_PROJECT_URL,
        SUPABASE_ANON_API_KEY,
        {
            global: {headers: {Authorization: request.headers.get('Authorization')!}},
            auth: {
                persistSession: false,
            }
        }
    )

    const {data: {user}} = await supabaseClient.auth.getUser();

    const uid = user?.id ?? '';

    const updateResponseFn = await storeResponse(uid, responseId);

    let openAIResponse;

    try {
        openAIResponse = await generateText(payload);
        console.log('openAIResponse', openAIResponse);
    } catch (e) {
        console.log('OpenAi error', e);
    }

    let finalResponse = '';

    return new ReadableStream({
        cancel() {
            console.log('Stream canceled by client');
            keepRunning = false;

            updateResponseFn?.(finalResponse)
        },
        async start(controller) {
            // callback
            function onParse(event: ParsedEvent | ReconnectInterval) {
                if (!keepRunning) {
                    controller.close();

                    return;
                }

                if (event.type === "event") {
                    const data = event.data;
                    // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
                    if (data === "[DONE]") {
                        updateResponseFn?.(finalResponse)
                        controller.close();

                        return;
                    }

                    try {
                        const json = JSON.parse(data);
                        const text = json?.choices?.[0]?.delta?.content || "";

                        console.log('text', text);
                        const queue = encoder.encode(text);
                        finalResponse += text;
                        controller.enqueue(queue);
                    } catch (e) {
                        console.log('HERE ERROR', e);
                        // maybe parse error
                        controller.error(e);
                    }
                }
            }

            // stream response (SSE) from OpenAI may be fragmented into multiple chunks
            // this ensures we properly read chunks and invoke an event for each SSE event stream
            const parser = createParser(onParse);
            // https://web.dev/streams/#asynchronous-iteration
            for await (const chunk of openAIResponse.body as any) {
                parser.feed(decoder.decode(chunk));
            }
        },
    });
}
