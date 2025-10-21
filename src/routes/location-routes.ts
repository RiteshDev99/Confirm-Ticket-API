import type {AppEnv} from "../config/app-env.ts";
import {Hono} from "hono";
import {handleResult} from "../utils/error/response-handler.ts";
import {err} from "neverthrow";
import {BadRequestError} from "../utils/error/errors.ts";
import {AutoSuggestion} from "../service/auto-suggestion.ts";

const locationRoutes = new Hono<AppEnv>();

locationRoutes.get("/suggestions", async (c) => {
    const query = c.req.query("q");

    if (!query) {
        return handleResult(err(new BadRequestError("Query parameter 'q' is required")));
    }

    const suggestions = await AutoSuggestion(query);
    return handleResult(suggestions);
});

export default locationRoutes;