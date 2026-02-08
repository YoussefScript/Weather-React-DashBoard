import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../api";
import { Coords } from "../types";
import { useLanguage } from "../components/LanguageProvider";

export function useWeatherData(coords: Coords) {
    const { language } = useLanguage();

    return useSuspenseQuery({
        queryKey: ['weather', coords.lat, coords.lon, language],
        queryFn: () => getWeather(coords.lat.toString(), coords.lon.toString(), language),
        // Cache for 5 minutes to reduce API calls
        staleTime: 5 * 60 * 1000,
    });
}
