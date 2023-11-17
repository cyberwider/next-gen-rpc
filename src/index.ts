export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        let config: Config;

        try {
            config = await loadConfig(env);
        } catch (e) {
            console.log("Failed to initialize config", e);
            return getInternalServerErrorResponse();
        }

        if (!config || !config.origins || config.origins.length === 0) {
            console.log("Config is empty");
            return getInternalServerErrorResponse();
        }

        const requestContext: RequestContext = {
            request,
            env,
            config,
            ctx,
            response: null,
        } as RequestContext

        let middleware: Middleware

        for (middleware of middlewares) {
            if (middleware.shouldBeProcessed(requestContext)) {
                try {
                    await middleware.process(requestContext);
                } catch (e) {
                    console.log(`Failed to process ${middleware.slug} middleware`, e);
                    break;
                }
            }
        }

        if (!requestContext.response) {
            requestContext.response = getInternalServerErrorResponse();
        }

        return requestContext.response;
    },

};
