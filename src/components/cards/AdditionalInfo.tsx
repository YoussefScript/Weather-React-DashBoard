import { useWeatherData } from "../../hooks/useWeatherData";
import Card from "./Card";
import Sunrise from '../../assets/sunrise.svg?react';
import Sunset from '../../assets/sunset.svg?react';
import Cloud from '../../assets/cloud.svg?react';
import Uv from '../../assets/uv.svg?react';
import Wind from '../../assets/wind.svg?react';
import Pressure from '../../assets/pressure.svg?react';
import Direction from '../../assets/direction.svg?react';

import { Coords } from "../../types";

type Props = {
    coords: Coords;
}

export default function AdditionalInfo({ coords }: Props) {
    const { data } = useWeatherData(coords);

    const { clouds, pressure, wind_deg, sunrise, sunset } = data.current;

    return (
        <Card title="Additional Weather Info" childrenClassName="flex flex-col gap-3 text-sm font-medium" >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">Cloudiness (%)</p>
                    <Cloud className="w-4 h-4 text-primary" />
                </div>
                <p>{clouds}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">UV Index</p>
                    <Uv className="w-4 h-4 text-primary" />
                </div>
                <p>0</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">Wind Direction</p>
                    <Wind className="w-4 h-4 text-primary" />
                </div>
                <div className="flex items-center gap-2">
                    <Direction
                        className="w-4 h-4 text-primary"
                        style={{ transform: `rotate(${wind_deg}deg)` }}
                    />
                    <p>{wind_deg}°</p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">Pressure (hPa)</p>
                    <Pressure className="w-4 h-4 text-primary" />
                </div>
                <p>{pressure}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">Sunrise</p>
                    <Sunrise className="w-4 h-4 text-primary" />
                </div>
                <p>{new Date(sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">Sunset</p>
                    <Sunset className="w-4 h-4 text-primary" />
                </div>
                <p>{new Date(sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
            </div>
        </Card >
    );
}
