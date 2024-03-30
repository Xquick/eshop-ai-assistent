import {API_URL} from "@/constants/variables.ts";

export async function getRequest(url, inputParams = {}, options = {}): Promise<Response> {
    const params = new URLSearchParams(inputParams);

    return fetch(`${API_URL}/${url}?${params.toString()}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        ...options,
    });
}
export async function postRequest(url, body = {}, options = {}): Promise<Response> {
    return fetch(`${API_URL}/${url}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(body),
        ...options,
    });
}

export async function createMessage(threadId,
                                    message,
                                    callbackOnIteration,
                                    callbackOnFinish?,
                                    callbackOnError?) {

    postRequest('message', { thread_id: threadId, message })
        .then(response => {
            const reader = response.body.getReader();

            return reader.read().then(function processText({ done, value }) {
                if (done) {
                    console.log('Stream complete');
                    callbackOnFinish?.()
                    return;
                }

                // Convert the Uint8Array to a string and process the chunk
                let text = new TextDecoder().decode(value);
                callbackOnIteration(text);

                // Read the next chunk
                return reader.read().then(processText);
            });
        })
        .catch(err => {
            callbackOnError?.(err);
            console.error('Fetch error:', err);
        });
}

export async function listMessages(threadId) {
    return getRequest('thread/list', { thread_id: threadId })
}

export async function createThread() {
    return postRequest('thread/create')
}
