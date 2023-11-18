import {RequestContext} from "../types";

class Middleware {
    slug: string = "middleware"

    async process(context: RequestContext): Promise<void> {
    }

}

export default Middleware;