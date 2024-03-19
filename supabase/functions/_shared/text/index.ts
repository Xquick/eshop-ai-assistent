// @ts-ignore
import {OPENAI_API_KEY} from "../secrets.ts";
import {ChatGPTMessage} from "../../app/openAIStream.ts";

export async function generateText(payload: any) {
    console.log('payload', payload);
    return fetch("https://api.openai.com/v1/chat/completions", {
        headers: {
            "Content-Type": "application/json",
            // @ts-ignore
            Authorization: `Bearer ${OPENAI_API_KEY ?? ""}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function createTextMessage(text: string): ChatGPTMessage {
    return {
        role: 'user',
        content: text
    }
}
