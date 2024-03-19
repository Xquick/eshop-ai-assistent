//@ts-ignore
import {getSupabaseClient, getSupabaseService} from "../supabase/index.ts";
//@ts-ignore
import {corsHeaders} from "../cors.ts";
import Stripe from "stripe";

//@ts-ignore
const stripe = Stripe(Deno.env.get("STRIPE_API_KEY"))

export async function getUserSubscription(request: Request) {
    const supabaseClient = getSupabaseClient(request);
    const supabaseService = getSupabaseService();
    const {data: {user}} = await supabaseClient.auth.getUser();

    console.log('user', user);
    const {data} = await supabaseService.from('stripe_customer_id_map')
        .select('stripe_customer_id')
        .eq('uid', user?.id)
        .single()

    console.log('data', data);
    if (!data) {
        return null;
    }

    const {data: subscriptionData} = await stripe.subscriptions.list({
        customer: data?.stripe_customer_id,
    })

    console.log('subscriptionData', subscriptionData);

    return subscriptionData;
}

export async function getUserProduct(request: Request) {
    const userSubscription = await getUserSubscription(request);

    if (!userSubscription || userSubscription.length === 0) {
        return null;
    }
    const productId = userSubscription[0].items.data[0].price.product;

   return await stripe.products.retrieve(productId);
}
