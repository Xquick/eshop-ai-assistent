export function getRequestURLPath(request: Request) {
    const host = request.headers.get('host');

    return  request.url
        .replace('https://', '')
        .replace('http://', '')
        .replace(`${host}/`, '');
}

export async function wait(seconds: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    })
}

export async function fetchJsonPost(endpoint: string, payload: any, { headers } = {headers: {}}) {

    console.log('JSON REQUEST',{
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        method: 'POST'
    })
    return fetch(endpoint, {
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        method: 'POST'
    })
}