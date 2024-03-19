import {GOOGLE_ANALYTICS_CODE, GOOGLE_ANALYTICS_KEY} from "./secrets.ts";
import {getSupabaseService} from "./supabase/index.ts";

export function initHighlightTracking() {
    // H.init("jdkjwrg5", {
    //     networkRecording: {
    //         enabled: true,
    //         recordHeadersAndBody: true,
    //     },
    // });
}

export async function sendEventToGA4(eventName: string, uid: string, params: any) {
    console.log(`Tracking GA4 Event ${eventName}, UID: ${uid}`, params);

    const supabaseService = getSupabaseService();

    const {data: profileData} = await supabaseService
        .from('profile')
        .select('ga_id')
        .eq('id', uid)
        .single()

    if (!profileData || !profileData.ga_id) {
        console.error(`Error getting user ${uid} Google Analytics tracking ID (ga_id) from profile DB table`, profileData);
        return;
    }

    const GA_PREFIX = 'GA1.1.';
    let trackingGAId = profileData.ga_id.replace(GA_PREFIX, '');

    console.log(`For user ${uid}, getting tracking id ga_id: ${trackingGAId}`);

    const payloadData = {
        client_id: trackingGAId,
        events: [{
            name: eventName,
            params,
        }],
    };

    try {
        const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${GOOGLE_ANALYTICS_CODE}&api_secret=${GOOGLE_ANALYTICS_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payloadData),
        });

        console.log('response response', response);

        if (response.ok) {
            console.log('Event sent to GA4 successfully');
        } else {
            console.error('Failed to send event to GA4:', await response.text());
        }
    } catch (error) {
        console.error('Error sending event to GA4:', error);
    }
}

