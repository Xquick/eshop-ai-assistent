import {createClient} from '@supabase/supabase-js'
import {Database} from "@/types/supabase.ts";
import {SUPABASE_ANON_KEY, SUPABASE_PROJECT_URL} from "@/constants/variables.ts";

export const supabase = createClient<Database>(
    SUPABASE_PROJECT_URL,
    SUPABASE_ANON_KEY
);

export async function getMessagesByChatIdFromDB(chatId: string) {
    return supabase.from('chat_prompt')
        .select('text,created_at,chat_response:response_id(id,created_at,status,text,suggestions,feedback_ok)')
        .eq('chat_id', chatId)
        .order('created_at', {ascending: true});
}

export async function subscribeToChatResponse(onChangeCallback) {
    supabase
        .channel('table-db-changes')
        .on('postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'chat_response',
            }, onChangeCallback)
        .subscribe()
}
