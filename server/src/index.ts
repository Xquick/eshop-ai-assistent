import {threadCreate, sendMessage, threadList} from "./service";
import {Response, Request} from "express";

const express = require('express');
var cors = require('cors')
const app = express();

const port = 3000;

app.use(express.json());
app.use(cors())

function useHeaders(res: Response) {
    // Set headers for a streamed response
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
}

app.post('/thread/create', async (req: Request, res: Response) => {
    const thread = await threadCreate();

    res.send(JSON.stringify({ thread_id: thread.id }));
});

app.get('/thread/list', async (req: Request, res: Response) => {
    const threadId = req.query?.thread_id as string;

    if (!threadId) {
        res.send(JSON.stringify({
            status: 'error',
            text: 'thread_id missing'
        }))
        return;
    }

    const messageList = await threadList(threadId);

    res.send(JSON.stringify({ data: messageList.getPaginatedItems()?.reverse() }));
});

app.post('/message', async (req: Request, res: Response) => {
    const threadId = req.body?.thread_id;
    const message = req.body?.message;

    if (!threadId) {
        res.send(JSON.stringify({
            status: 'error',
            text: 'thread_id missing'
        }))
        return;
    }

    const assistantId = 'asst_ueUvbYufbtGJblQGx2YigbiF';

    await sendMessage(message, threadId, assistantId, res);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});