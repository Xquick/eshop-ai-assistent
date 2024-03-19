// @ts-ignore
import {corsHeaders} from "../_shared/cors.ts";
// @ts-ignore
import {ChatGPTMessage, OpenAIStream, OpenAIStreamPayload} from "./openAIStream.ts";
import {getErrorResponse} from "../_shared/error/index.ts";
import {SUGGESTION_DELIMITER} from "../_shared/model/index.ts";
import {createTextMessage} from "../_shared/text/index.ts";

export async function requestHandler(request: Request): Promise<Response> {
    if (request.method === 'OPTIONS') {
        return new Response('ok', {headers: corsHeaders});
    }

    let requestJson;
    try {
        requestJson = await request.json();
    } catch (e) {
        console.error(e);
        return;
    }

    let messages: ChatGPTMessage[] = requestJson.messages;
    let contentType = requestJson.contentType;
    let responseId = requestJson.responseId;
    let length = requestJson.length;

    if (length) {
        messages.push(createTextMessage(`Length of your response should be ${length}.`))
    }

    // messages.unshift(...getInitialMessageContext(contentType))
    // messages.unshift({
    //     role: 'user',
    //     content: 'Piš v českém jazyce.'
    // });

    const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7, // how creative AI is
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 1000,
        stream: true,
        n: 1,
    };

    let stream;

    try {
        stream = await OpenAIStream(request, payload, contentType, responseId);
    } catch (e) {
        console.log(e);
        return getErrorResponse(e);
    }

    return new Response(stream, {headers: corsHeaders});
}

