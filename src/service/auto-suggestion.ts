import logger from "../utils/logger.ts";
import { err, ok, Result } from "neverthrow";
import { type AppError } from "../utils/error/errors.ts";
import type {AutoSuggestionResponse, StationPrams} from "../schema/suggestion-schema.ts";



export async function AutoSuggestion(
    query: string,
    sourceStn?:string
): Promise<Result<StationPrams[], AppError>> {
    try {
        const baseUrl = "https://cttrainsapi.confirmtkt.com/api/v2/trains/stations/auto-suggestion";
        const url =
            `${baseUrl}?searchString=${query}` +
            (sourceStn ? `&sourceStnCode=${sourceStn}` : "") +
            `&popularStnListLimit=15&preferredStnListLimit=6&channel=mwebd&language=EN`;

        const response = await fetch(url);
        if (!response.ok) {
            logger.error(`HTTP error! Status: ${response.status}`);
            return err({
                message: `HTTP error! Status: ${response.status}`,
            } as AppError);
        }

        const data: AutoSuggestionResponse = await response.json();
        const stationList: StationPrams[] = data.data?.stationList ?? [];

        const station = stationList.map((station:StationPrams) => {
            return {
                stationCode: station.stationCode,
                stationName: station.stationName,
                city: station.city,
                state: station.state,
                latitude: station.latitude,
                longitude: station.longitude,
            };
        });

        logger.info("Station List:\n" + JSON.stringify(station, null, 2));
        return ok(station);
    } catch (e) {
        logger.error("AutoSuggestion Error ::", e);
        return err({ message: "Failed to fetch stations" } as AppError);
    }
}


