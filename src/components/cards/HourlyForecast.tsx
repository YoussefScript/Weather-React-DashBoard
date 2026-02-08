import { useWeatherData } from "../../hooks/useWeatherData";
import Card from "./Card";

import { Coords } from "../../types";

type Props = {
    coords: Coords;
}

export default function HourlyForecast({ coords }: Props) {
    const { data } = useWeatherData(coords);

    const getHour = (dt: number) => {
        return new Date(dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    return (
        <Card title="Hourly Forecast (48 Hours)" childrenClassName="flex flex-row overflow-x-auto gap-5 pb-2">
            {
                data?.hourly.slice(0, 48).map(hour => (
                    <div key={hour.dt} className="flex flex-col items-center gap-2 min-w-[76px]">
                        <p className="text-muted-foreground whitespace-nowrap text-xs font-medium">{getHour(hour.dt)}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                            alt={hour.weather[0].description}
                            className="w-10 h-10"
                        />
                        <p className="font-semibold text-base">{Math.round(hour.temp)}°C</p>
                    </div>
                ))
            }
        </Card>
    );
}
