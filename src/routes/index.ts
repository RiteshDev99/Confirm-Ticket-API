/**
 * This file will contain all the routes for the application.
 * **/
import {Hono} from "hono";
import type {AppEnv} from "../config/app-env.ts";
import {AutoSuggestion} from "../service/auto-suggestion.ts";
import {handleResult} from "../utils/error/response-handler.ts";
import {BadRequestError} from "../utils/error/errors.ts";
import {err} from "neverthrow";

const routes = new Hono<AppEnv>();

// Health check endpoint
routes.get("/", (c) => {
    return c.json({
        status: "healthy",
        message: "API is running successfully",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

routes.get("/search", async (c) => {
    const query = c.req.query("q");
    if (!query) {
        return handleResult(err(new BadRequestError("q, parameters are required")));
    }
    const suggestions = await AutoSuggestion(query);
    return handleResult(suggestions);
});

export default routes;