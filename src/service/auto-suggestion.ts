import logger from "../utils/logger.ts";
import { err, ok, Result } from "neverthrow";
import { type AppError } from "../utils/error/errors.ts";
import type {AutoSuggestionResponse, StationPrams} from "../schema/suggestion-schema.ts";

export async function AutoSuggestion(
    query: string ,
): Promise<Result<StationPrams[], AppError>> {
    try {

        const url = `https://cttrainsapi.confirmtkt.com/api/v2/trains/stations/auto-suggestion?searchString=${query}&language=EN&sourceStnCode=&latitude=0.0&longitude=0.0&popularStnListLimit=15&preferredStnListLimit=6&channel=android`.replace(/\s+/g, "");

        const response = await fetch(url);
        if (!response.ok) {
            logger.error(`HTTP error! Status: ${response.status}`);
            return err({
                message: `HTTP error! Status: ${response.status}`,
            } as AppError);
        }

        const data: AutoSuggestionResponse = await response.json();
        const stationList: StationPrams[] = data.data?.stationList ?? [];
        const popularStationList: StationPrams[] = data.data?.popularStationList ?? [];
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

        console.log(popularStationList)
        logger.info("Station List:\n" + JSON.stringify(station, null, 2));
        logger.info("PopularStationList:\n" + JSON.stringify(popularStationList, null, 2));
        
      return ok({
            ...station,
            ...popularStationList,
      });
    } catch (e) {
        logger.error("AutoSuggestion Error ::", e);
        return err({ message: "Failed to fetch stations" } as AppError);
    }
}


AutoSuggestion('')