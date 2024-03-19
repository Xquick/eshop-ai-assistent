// @ts-ignore
import {serve} from 'server'
// @ts-ignore
import {OpenAIStream} from './openAIStream.ts';
// @ts-ignore
import {corsHeaders} from "../_shared/cors.ts";
// @ts-ignore
import {requestHandler} from "./requestHandler.ts";
// @ts-ignore
import {initHighlightTracking} from "../_shared/tracking.ts";

initHighlightTracking();

serve(requestHandler);