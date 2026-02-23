import { useWeatherData } from "../../hooks/useWeatherData";
import Card from "./Card";
import Sunrise from '../../public/sunrise.svg?react';
import Sunset from '../../public/sunset.svg?react';
import Cloud from '../../public/cloud.svg?react';
import Uv from '../../public/uv.svg?react';
import Wind from '../../public/wind.svg?react';
import Pressure from '../../public/pressure.svg?react';
import Direction from '../../public/direction.svg?react';
import { useLanguage } from "../LanguageProvider";

import { Coords } from "../../types";

type Props = {
    coords: Coords;
}

export default function AdditionalInfo({ coords }: Props) {
    const { data } = useWeatherData(coords);
    const { t, language } = useLanguage();

    const { clouds, pressure, wind_deg, sunrise, sunset } = data.current;

    const formatTime = (time: number) => {
        return new Date(time * 1000).toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    return (
        <Card title={t('weather.additionalInfo')} childrenClassName="flex flex-col gap-4 text-sm sm:text-base font-medium" >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">{t('weather.cloudiness')}</p>
                    <Cloud className="w-4 h-4 text-primary" />
                </div>
                <p>{clouds}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">{t('weather.uv')}</p>
                    <Uv className="w-4 h-4 text-primary" />
                </div>
                <p>0</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">{t('weather.windDirection')}</p>
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
                    <p className="text-muted-foreground">{t('weather.pressure')} (hPa)</p>
                    <Pressure className="w-4 h-4 text-primary" />
                </div>
                <p>{pressure}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">{t('weather.sunrise')}</p>
                    <Sunrise className="w-4 h-4 text-primary" />
                </div>
                <p>{formatTime(sunrise)}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">{t('weather.sunset')}</p>
                    <Sunset className="w-4 h-4 text-primary" />
                </div>
                <p>{formatTime(sunset)}</p>
            </div>
        </Card >
    );
}