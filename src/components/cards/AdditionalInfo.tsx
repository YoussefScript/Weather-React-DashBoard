import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import Sunrise from '../../assets/sunrise.svg?react';
import Sunset from '../../assets/sunset.svg?react';
import Cloud from '../../assets/cloud.svg?react';
import Uv from '../../assets/uv.svg?react';
import Wind from '../../assets/wind.svg?react';
import Pressure from '../../assets/pressure.svg?react';
import Direction from '../../assets/direction.svg?react';

export default function AdditionalInfo() {
    const { data } = useSuspenseQuery({
        queryKey: ['weather'],
        queryFn: () => getWeather('24.0889', '32.8998'), // Aswan, Egypt
    });

    const { clouds, pressure, wind_deg, sunrise, sunset } = data.current;

    return (
        <Card title="Additional Weather Info" childrenClassName="flex flex-col gap-4 text-sm font-medium">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-zinc-500">Cloudiness (%)</p>
                    <Cloud className="w-5 h-5 text-white"/>
                </div>
                <p>{clouds}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-zinc-500">UV Index</p>
                    <Uv className="w-5 h-5 text-white"/>
                </div>
                <p>0</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-zinc-500">Wind Direction</p>
                    <Wind className="w-5 h-5 text-white"/>
                </div>
                <div className="flex items-center gap-2">
                    <Direction
                        className="w-5 h-5 text-white"
                        style={{ transform: `rotate(${wind_deg}deg)` }}
                    />
                    <p>{wind_deg}°</p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-zinc-500">Pressure (hPa)</p>
                    <Pressure className="w-5 h-5 text-white"/>
                </div>
                <p>{pressure}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-zinc-500">Sunrise</p>
                    <Sunrise className="w-5 h-5 text-white"/>
                </div>
                <p>{new Date(sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-zinc-500">Sunset</p>
                    <Sunset className="w-5 h-5 text-white"/>
                </div>
                <p>{new Date(sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
            </div>
        </Card>
    );
}
