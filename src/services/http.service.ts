import {supabase} from "@/supabase.ts";
import {SUPABASE_PROJECT_URL} from "@/constants/variables.ts";

export async function postRequest(url, body = {}, options = {}): Promise<Response> {
    const session = await supabase.auth.getSession();
    // let accessToken = session?.data?.session?.access_token;
    let accessToken = `super-secret-jwt-token-with-at-least-32-characters-long`;

    return fetch(`${SUPABASE_PROJECT_URL}/functions/v1/${url}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(body),
        ...options,
    });
}

export async function getHttpAIStream({
                                          messages,
                                          responseId
                                      }, callbackOnInit,
                                      callbackOnIteration,
                                      callbackOnFinish,
                                      callbackOnError) {
    callbackOnInit();
    const controller = new AbortController();
    const signal = controller.signal;

    let response;
    let done = false;

    try {
        response = await postRequest('app', {
            messages,
            responseId
        }, {signal});

        console.log(response);
        if (!response.ok) {
            return response;
        }
    } catch (e) {
        console.error(e);
        return response;
    }

    const data = response.body;

    if (!data) {
        console.error(`No Stream`);
        return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let buffer = [];
    let foundDelimiter = false;
    const BUFFER_SIZE = 8;

    while (!done) {
        const {value, done: doneReading} = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        const keepGenerating = callbackOnIteration(chunkValue);

        if (!keepGenerating) {
            done = true;
            controller.abort();
        }
    }

    callbackOnFinish();

    return response;
}
