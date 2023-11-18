import Middleware from "./base";
import {RequestContext} from "../types";
import {getUserAgentFromHeaders} from "../utils";


class AllowByUserAgentMiddleware extends Middleware {
    slug: string = "allowByUserAgent"

    async process(context: RequestContext): Promise<void> {
        const {request, env} = context;
        const clientUserAgent: string = getUserAgentFromHeaders(request.headers);
        const allowedUserAgents: string[] = env.ALLOWED_USER_AGENTS || [];
        if (allowedUserAgents.length == 0) {
            return;
        }
        let isAllowed: boolean = false;
        allowedUserAgents.map((userAgent: string): void => {
            if (new RegExp(userAgent).test(clientUserAgent)) {
                isAllowed = true;
            }
        })

        if (!isAllowed) {
            context.response = new Response("Forbidden", {status: 403});
        }
    }
}

export default AllowByUserAgentMiddleware;