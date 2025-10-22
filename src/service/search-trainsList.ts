import logger from "../utils/logger.ts";
import { ok, err, Result } from "neverthrow";
import type { AppError } from "../utils/error/errors.ts";

export async function TrainsList(
    fromStn : string,
    toStn : string,
): Promise<Result<unknown, AppError>> {
    try {
        const url =
            `https://cttrainsapi.confirmtkt.com/api/v1/trains/search?sourceStationCode=${fromStn}&destinationStationCode=${toStn}&addAvailabilityCache=true&excludeMultiTicketAlternates=false&excludeBoostAlternates=false&sortBy=DEFAULT&dateOfJourney=23-10-2025&enableNearby=true&enableTG=true&tGPlan=CTG-A9&showTGPrediction=false&tgColor=DEFAULT&showPredictionGlobal=true`;

        const response = await fetch(url);
        if (!response.ok) {
            logger.error(`HTTP error! Status: ${response.status}`);
            return err({ message: `HTTP error! Status: ${response.status}` } as AppError);
        }

        const data = await response.json();
        logger.info("TrainsList:", JSON.stringify(data, null, 2));

        return ok(data);
    } catch (e) {
        logger.error("TrainsList Error ::", e);
        return err({ message: "Failed to fetch TrainsList" } as AppError);
    }
}
