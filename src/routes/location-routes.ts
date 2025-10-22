import type {AppEnv} from "../config/app-env.ts";
import {Hono} from "hono";
import {handleResult} from "../utils/error/response-handler.ts";
import {err} from "neverthrow";
import {BadRequestError} from "../utils/error/errors.ts";
import {AutoSuggestion} from "../service/auto-suggestion.ts";
import {TrainsList} from "../service/search-trainsList.ts";

const locationRoutes = new Hono<AppEnv>();

locationRoutes.get("/suggestions", async (c) => {
    const query = c.req.query("q");

    if (!query) {
        return handleResult(err(new BadRequestError("Query parameter 'q' is required")));
    }

    const suggestions = await AutoSuggestion(query);
    return handleResult(suggestions);
});


locationRoutes.get("/TrainsList", async (c) => {
    const fromStationName = c.req.query("fromStationName");
    const toStationName = c.req.query("toStationName");

    if (!fromStationName || !toStationName) {
        return handleResult(err(new BadRequestError("Both 'fromStationName' and 'toStationName' are required.")));
    }

    const suggestions = await TrainsList(fromStationName, toStationName);
    return handleResult(suggestions);
});

export default locationRoutes;