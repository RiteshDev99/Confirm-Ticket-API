import type {AppEnv} from "../config/app-env.ts";
import {Hono} from "hono";
import {handleResult} from "../utils/error/response-handler.ts";
import {err} from "neverthrow";
import {BadRequestError} from "../utils/error/errors.ts";
import {AutoSuggestion} from "../service/auto-suggestion.ts";
import {TrainsList} from "../service/search-trainsList.ts";

const stationServicesRoutes = new Hono<AppEnv>();

stationServicesRoutes.get("/suggestions", async (c) => {
    const query = c.req.query("q");
    if (!query) {
        return c.text('', 200);
    }

    const suggestions = await AutoSuggestion(query);

    return (handleResult(suggestions));
});


stationServicesRoutes.get("/train-list", async (c) => {
    const fromStn = c.req.query("fromStn");
    const toStn = c.req.query("toStn");

    if (!fromStn || !toStn) {
        return handleResult(err(new BadRequestError("Both 'fromStn' and 'toStn' are required.")));
    }
    const suggestions = await TrainsList(fromStn, toStn);
    return handleResult(suggestions);
});

export default stationServicesRoutes;