// @ts-ignore
import {getSupabaseService} from "../supabase/index.ts";
// @ts-ignore
import { decode, encode } from "https://deno.land/x/pngs/mod.ts";
// @ts-ignore
import { decode as base64Decode, encode as base64Encode } from 'https://deno.land/std@0.166.0/encoding/base64.ts'
// @ts-ignore
import {Buffer} from "https://deno.land/std/io/buffer.ts";

export async function storeImage(imageId, responseId, status) {
    const supabaseService = getSupabaseService();

    const {error: errorUpdateChatResponse} = await supabaseService
        .from('chat_response')
        .update({
            text: imageId,
            status,
        })
        .eq('id', responseId)

    if (errorUpdateChatResponse) {
        throw new Error('Error updating image')
    }
}


export const getStableDiffusionCDN =
    (cdnId: string, imageId: string) => `https://${cdnId}.stablediffusionapi.com/generations/${imageId}`;

export function modifyMetadata(base64Input) {
    const pngDecoded = decode(base64ToUint8Array(base64Input));

    // return encode(pngDecoded)
}

function base64ToUint8Array(base64: string): Uint8Array {
    const raw = atob(base64);
    const uint8Array = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
        uint8Array[i] = raw.charCodeAt(i);
    }
    return uint8Array;
}