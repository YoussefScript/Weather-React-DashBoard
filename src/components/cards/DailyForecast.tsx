import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";

import { Coords } from "../../types";

type Props = {
  coords: Coords;
}

export default function DailyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', coords.lat, coords.lon],
    queryFn: () => getWeather(coords.lat.toString(), coords.lon.toString()),
  });

  const getDayName = (dt: number) => {
    return new Date(dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-2" >
      <div className="grid grid-cols-5 text-sm text-zinc-500 font-medium text-center">
        <p className="text-left">Day</p>
        <p></p>
        <p>High</p>
        <p>Low</p>
        <p>Feels</p>
      </div>
      {data?.daily.map((day: any) => (
        <div key={day.dt} className="grid grid-cols-5 items-center text-center">
          <p className="text-left font-medium">{getDayName(day.dt)}</p>
          <div className="flex justify-center">
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="w-8 h-8 object-contain"
            />
          </div>
          <p className="font-medium">{Math.round(day.temp.max)}°C</p>
          <p className="text-zinc-500 font-medium">{Math.round(day.temp.min)}°C</p>
          <p className="text-zinc-400 text-xs">{Math.round(day.feels_like.day)}°C</p>
        </div>
      ))
      }
    </Card >
  );
}
