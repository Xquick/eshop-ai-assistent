// @ts-ignore
import {SUPABASE_PROJECT_URL, SUPABASE_SERVICE_API_KEY} from "../_shared/secrets.ts";
// @ts-ignore
import GPT3NodeTokenizer from 'gpt3-tokenizer';
import {getUserTokenCount} from "../_shared/token.ts";
import {getSupabaseService} from "../_shared/supabase/index.ts";
import {SUGGESTION_DELIMITER} from "../_shared/model/index.ts";

export const storeResponse = async (uid: string, responseId: string): Promise<Function | null> => {
    console.log('User ID:', uid);
    console.log('Response ID:', responseId);
    // TODO fix user id - user is not logged in so we need some other ID

    // if (!uid) {
    //     return null;
    // }

    const supabaseService = getSupabaseService();

    return async (finalResponse: string) => {
        const {error: errorUpdateChatResponse} = await supabaseService
            .from('chat_response')
            .update({
                text: finalResponse
            })
            .eq('id', responseId)

        if (errorUpdateChatResponse) {
            console.error(errorUpdateChatResponse);
            throw new Error(`Error updating DB table chat_response`);
        }
    }
}
