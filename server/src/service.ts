import { OpenAI } from "openai";
import dotenv from "dotenv";
import {PassThrough} from "node:stream";
import { Response } from 'express';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})

export const threadCreate = () => {
    return openai.beta.threads.create()
}

export const threadList = (threadId: string) => {
    return openai.beta.threads.messages.list(threadId)
}

export const sendMessage = async (inputMessage: string, threadId: string, assistantId: string, res: Response) => {
    const assistant = await openai.beta.assistants.retrieve(assistantId);

    const message = await openai.beta.threads.messages.create(threadId, {
        role:'user',
        content: inputMessage,
    });

    // Create a PassThrough stream. This will be our mechanism for pushing content.
    const stream = new PassThrough();

    // Pipe our stream to the response
    stream.pipe(res);

    // Example of how to dynamically add text to the stream
    const run = openai.beta.threads.runs.createAndStream(threadId, {
        assistant_id: assistant.id
    })
        .on('textCreated', (text) => stream.write('\nassistant > '))
        .on('textDelta', (textDelta, snapshot) => {
            console.log(textDelta?.value)
            stream.write(textDelta?.value);
        })
        .on('textDone', (textDelta, snapshot) => stream.end())
        .on('toolCallCreated', (toolCall) => stream.write(`\nassistant > ${toolCall.type}\n\n`))
        .on('toolCallDelta', (toolCallDelta, snapshot) => {
            if (toolCallDelta.type === 'code_interpreter') {
                if (toolCallDelta.code_interpreter?.input) {
                    stream.write(toolCallDelta.code_interpreter.input);
                }
                if (toolCallDelta.code_interpreter?.outputs) {
                    stream.write("\noutput >\n");
                    toolCallDelta.code_interpreter.outputs.forEach(output => {
                        if (output.type === "logs") {
                            stream.write(`\n${output.logs}\n`);
                        }
                    });
                }
            }
        });
}
