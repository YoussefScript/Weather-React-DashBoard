import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";

import { Coords } from "../../types";

type Props = {
    coords: Coords;
}

export default function HourlyForecast({ coords }: Props) {
    const { data } = useSuspenseQuery({
        queryKey: ['weather', coords.lat, coords.lon],
        queryFn: () => getWeather(coords.lat.toString(), coords.lon.toString()),
    });

    const getHour = (dt: number) => {
        return new Date(dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    return (
        <Card title="Hourly Forecast (48 Hours)" childrenClassName="flex flex-row overflow-x-auto gap-6 pb-2" >
            {
                data?.hourly.slice(0, 48).map(hour => (
                    <div key={hour.dt} className="flex flex-col items-center gap-2 min-w-[80px]">
                        <p className="text-zinc-400 whitespace-nowrap text-sm">{getHour(hour.dt)}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                            alt={hour.weather[0].description}
                            className="w-12 h-12"
                        />
                        <p className="font-semibold text-xl">{Math.round(hour.temp)}°C</p>
                    </div>
                ))
            }
        </Card >
    );
}
