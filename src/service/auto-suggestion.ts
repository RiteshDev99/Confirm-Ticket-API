import logger from "../utils/logger.ts";
import {err, ok, Result} from "neverthrow";
import {type AppError, InternalServerError} from "../utils/error/errors.ts";
import type {AutoSuggestionResponse} from "../schema/suggestion-schema.ts";
import {createHttpClient} from "../utils/http/http-client.ts";

export async function AutoSuggestion(
    query: string,
): Promise<Result<AutoSuggestionResponse, AppError>> {
    try {
        const client = createHttpClient();
        const url = `https://cttrainsapi.confirmtkt.com/api/v2/trains/stations/auto-suggestion?searchString=${query}&language=EN&sourceStnCode=&latitude=0.0&longitude=0.0&popularStnListLimit=15&preferredStnListLimit=6&channel=android`.replace(/\s+/g, "");

        const response = await client.get(url);
        if (!response.ok) {
            logger.error(`HTTP error! Status: ${response.status}`);
            return err(new InternalServerError("Failed to fetch stations"));
        }

        const data: AutoSuggestionResponse = await response.json();
        logger.info("AutoSuggestion Response ::", data);
        return ok(data);
    } catch (e) {
        logger.error("AutoSuggestion Error ::", e);
        return err(new InternalServerError("An unexpected error occurred"));
    }
}