// @ts-ignore
import {IEcomailSubscriberData} from "../../../../model/ecomail.ts";

const ECOMAIL_API_KEY = '96998a3badf919db8503b3eecda5f0b874dc91523b08592886ec68e38f0ca361';
const ECOMAIL_API_ENDPOINT = 'https://api2.ecomailapp.cz';
const ECOMAIL_LIST_ID = '1';

export async function addSubscriberToList(subscriberData: IEcomailSubscriberData) {
    const ecomailPath = `${ECOMAIL_API_ENDPOINT}/lists/${ECOMAIL_LIST_ID}/subscribe`;

    console.log('Ecomail subscriber payloar', subscriberData);
    return fetch(ecomailPath, {
        body: JSON.stringify({
            subscriber_data: subscriberData
        }),
        method: 'POST',
        headers: {
            'key': ECOMAIL_API_KEY,
            'Content-Type': 'application/json'
        },
    })
}

export async function updateSubscriberByEmail(subscriberData: IEcomailSubscriberData) {
    const ecomailPath = `${ECOMAIL_API_ENDPOINT}/lists/${ECOMAIL_LIST_ID}/update-subscriber`;

    console.log('ecomailPath', ecomailPath);
    console.log('subscriberDatasubscriberData', subscriberData);
    const { email, ...updatePayload } = subscriberData;

    console.log('updatePayload', {
        email: email,
        subscriber_data: updatePayload
    });
    return fetch(ecomailPath, {
        body: JSON.stringify({
            email: email,
            subscriber_data: updatePayload
        }),
        method: 'PUT',
        headers: {
            'key': ECOMAIL_API_KEY,
            'Content-Type': 'application/json'
        },
    })
}

export async function sendEmail(email) {
    const ecomailPath = `${ECOMAIL_API_ENDPOINT}/transactional/send-message`;

    return fetch(ecomailPath, {
        body: JSON.stringify({
            message: {
                subject: 'Test Subjekt',
                from_name: 'Blue AI platby',
                from_email: 'ucetni@blueai.cz',
                text: 'test textu',
                html: '<strong>test textu</strong>',
                to: email,
                options: {
                    click_tracking: true,
                    open_tracking: true
                }
            },
        }),
        method: 'POST',
        headers: {
            'key': ECOMAIL_API_KEY,
            'Content-Type': 'application/json'
        },
    })
}