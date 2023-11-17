import {corsHeaders} from "../utils";
import {RequestContext} from "../types";


async function handleHttpRequest(context: RequestContext): Promise<void> {
    const {request, config} = context;
    let serverResponse;
    // read body and save it
    const requestBody: ArrayBuffer = await request.arrayBuffer();
    // @ts-ignore
    const lat: string | null = request.cf?.latitude;
    // @ts-ignore
    const lon: string | null = request.cf?.longitude;

    let origins = config.orderedOrigins(Number(lat), Number(lon));

    // check if origin exists and no response
    for (let origin of origins) {
        try {
            const url: URL = new URL(origin.httpEndpoint);
            serverResponse = await makeRequestToServer(url, requestBody, request.method, request.headers);
            if (serverResponse.status >= 500) {
                console.log(`failed to fetch ${origin.slug} exception`);
            } else {
                context.response = new Response(serverResponse.body, {
                    status: serverResponse.status,
                    statusText: serverResponse.statusText,
                    headers: corsHeaders,
                });
                context.response.headers.set('x-origin-slug', origin.slug);
                break;
            }
        } catch (e) {
            console.log(e);
            break;
        }
    }
}

export {handleHttpRequest};
