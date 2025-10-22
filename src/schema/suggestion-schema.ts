export interface StationPrams {
    stationCode: string;
    stationName: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
}

export interface TrainsListParams {
    stationCode: string;
    stationName: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
}


export interface AutoSuggestionResponse {
    data?: {
        stationList?: StationPrams[];
    };
}