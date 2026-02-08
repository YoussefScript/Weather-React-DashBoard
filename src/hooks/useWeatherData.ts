import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../api";
import { Coords } from "../types";

export function useWeatherData(coords: Coords) {
    return useSuspenseQuery({
        queryKey: ['weather', coords.lat, coords.lon],
        queryFn: () => getWeather(coords.lat.toString(), coords.lon.toString()),
        // Cache for 5 minutes to reduce API calls
        staleTime: 5 * 60 * 1000,
    });
}
