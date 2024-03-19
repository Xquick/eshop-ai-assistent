import {getSupabaseService} from "./supabase/index.ts";
import {TokenExceptionCountUndefined, TokenExceptionLowCount} from "./error/index.ts";

export async function getUserTokenCount(uid: string): Promise<number> {
    // const supabaseService = getSupabaseService();
    //
    // const {data} = await supabaseService
    //     .from('token')
    //     .select('token_count')
    //     .eq('uid', uid);

    // const tokenCount = data?.[0]?.token_count;
    //
    // if (typeof tokenCount === 'undefined') {
    //     throw TokenExceptionCountUndefined;
    // }

    // if (tokenCount <= 0) {
    //     throw TokenExceptionLowCount;
    // }

    // return tokenCount;
}
