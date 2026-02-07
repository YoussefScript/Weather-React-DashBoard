import { useWeatherData } from "../../hooks/useWeatherData";
import Card from "./Card";
import { Coords } from "../../types";

type Props = {
  coords: Coords;
}

export default function CurrentWeather({ coords }: Props) {
  const { data } = useWeatherData(coords);

  const getLocalTime = (dt: number, timezone: number) => {
    // Shift time by offset to get the correct time at location, then read as UTC
    const date = new Date((dt + timezone) * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: true });
  };

  return (
    <Card title="Current Weather" childrenClassName="flex flex-col items-center gap-8 py-4">
      {/* Main Temp & Icon */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-7xl font-semibold tracking-tighter">
          {Math.round(data?.current.temp || 0)}°C
        </h1>
        <div className="flex flex-col items-center gap-1">
          <img
            src={`https://openweathermap.org/img/wn/${data?.current.weather[0].icon}@2x.png`}
            alt={data?.current.weather[0].description}
            className="w-16 h-16 drop-shadow-lg"
          />
          <p className="text-xl text-zinc-300 capitalize font-medium">{data?.current.weather[0].description}</p>
        </div>
      </div>

      {/* Local Time */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-zinc-400 text-sm">Local Time:</p>
        <p className="text-4xl font-semibold tracking-wide">
          {data?.current ? getLocalTime(data.current.dt, data.current.timezone) : '--:--'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="w-full grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
        <div className="flex flex-col items-center gap-1">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Feels Like</p>
          <p className="text-lg font-semibold">{Math.round(data?.current.feels_like || 0)}°C</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Humidity</p>
          <p className="text-lg font-semibold">{data?.current.humidity}%</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Wind</p>
          <p className="text-lg font-semibold">{data?.current.wind_speed} m/s</p>
        </div>
      </div>
    </Card>
  );
}
