import {createClient} from "@supabase/supabase-js";
// @ts-ignore
import {SUPABASE_ANON_API_KEY, SUPABASE_PROJECT_URL, SUPABASE_SERVICE_API_KEY, TRIAL_PERIOD_DAYS} from "../secrets.ts";
import {addDaysToDate, isDate1AfterDate2} from "../utils/date.ts";

export function getSupabaseService() {
    return createClient(
        SUPABASE_PROJECT_URL,
        SUPABASE_SERVICE_API_KEY,
        {
            auth: {
                persistSession: false,
            }
        }
    )
}

export function getSupabaseClient(request) {
    return createClient(
        SUPABASE_PROJECT_URL,
        SUPABASE_ANON_API_KEY,
        {
            global: {headers: {Authorization: request.headers.get('Authorization')!}},
            auth: {
                persistSession: false,
            }
        })
}

export async function getUserId(request: Request) {
    const supabaseClient = getSupabaseClient(request);
    const {data: {user}} = await supabaseClient.auth.getUser();

    return user?.id;
}

export async function getStripeCustomerId(request: Request) {
    const supabaseClient = getSupabaseClient(request);
    const supabaseService = getSupabaseService();
    const {data: {user}} = await supabaseClient.auth.getUser();

    const {data} = await supabaseService
        .from('stripe_customer_id_map')
        .select('stripe_customer_id')
        .eq('uid', user?.id)
        .single();

    return data?.stripe_customer_id;
}

export async function getUidByStripeId (stripeCustomerId: string) {
    const supabaseService = getSupabaseService();

    const {data} = await supabaseService
        .from('stripe_customer_id_map')
        .select('uid')
        .eq('stripe_customer_id', stripeCustomerId)
        .single()

    return data?.uid;
}

export async function getStripeIdByUid (uid: string) {
    const supabaseService = getSupabaseService();

    const {data} = await supabaseService
        .from('stripe_customer_id_map')
        .select('stripe_customer_id')
        .eq('uid', uid)
        .single()

    return data?.stripe_customer_id;
}

export async function updateTokenCount(uid, tokenCount, reason) {
    console.log(`Updating tokens by ${tokenCount}, for reason ${reason}`);
    const supabaseService = getSupabaseService();

    const {data: tokens} = await supabaseService
        .from('token')
        .select()
        .eq('uid', uid)
        .single()

    console.log('Current token row in DB ', tokens);

    if (tokens === null) {
        console.error(`Token count not found in DB for user with uid ${uid}`);
    }

    let newAbsoluteCount = parseInt(tokens?.token_count || 0) + parseInt(tokenCount);

    console.log('New token count ', newAbsoluteCount);

    let tokenMovementCount = tokenCount;

    if (!isNaN(newAbsoluteCount) && !isNaN(tokenMovementCount)) {
        await supabaseService
            .from('token')
            .update({
                token_count: newAbsoluteCount,
            })
            .eq('uid', uid);

        await supabaseService
            .from('token_movement')
            .insert({
                uid,
                token_count: tokenMovementCount,
                reason,
            });
    } else {
        console.error(`Not updated user tokens. Token movement is: ${tokenMovementCount}. New token count is: ${newAbsoluteCount}`);
    }
}

export async function isTrial(request:Request) {
    const supabaseClient = getSupabaseClient(request);
    const {data: {user}} = await supabaseClient.auth.getUser();

    const userCreatedDate = new Date(user.created_at);
    const trialEndsDate = addDaysToDate(userCreatedDate, TRIAL_PERIOD_DAYS);

    return isDate1AfterDate2(trialEndsDate, new Date());
}

export async function imageCountGenerated(uid: string) {
    const supabaseService = getSupabaseService();

    const {data} = await supabaseService
        .from('token_movement')
        .select('uid, reason')
        .eq('uid', uid)
        .eq('reason', 'image');

    console.log('Number of images', data.length);
    return data.length
}
