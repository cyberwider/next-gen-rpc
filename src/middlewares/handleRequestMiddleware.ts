import Middleware from "./base";
import {RequestContext} from "../types";

import {handleHttpRequest} from "../handler/http";
import {handleWsRequest} from "../handler/ws";
import {isWebsocketRequest} from "../utils";

class HandleRequestMiddleware extends Middleware {
    slug: string = "handleRequest"

    async process(context: RequestContext): Promise<void> {
        await handleHttpRequest(context);
    }
}

export default HandleRequestMiddleware;