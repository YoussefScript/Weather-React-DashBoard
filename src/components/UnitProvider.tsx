import React, { createContext, useContext, useState, useEffect } from 'react';

export type Unit = 'metric' | 'imperial';

interface UnitContextType {
    unit: Unit;
    setUnit: (unit: Unit) => void;
    toggleUnit: () => void;
    convertTemp: (temp: number) => number;
    convertWindSpeed: (speed: number) => string;
    unitSymbol: string;
    windUnit: string;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export function UnitProvider({ children }: { children: React.ReactNode }) {
    const [unit, setUnit] = useState<Unit>(() => {
        const saved = localStorage.getItem('app-unit');
        return (saved as Unit) || 'metric';
    });

    useEffect(() => {
        localStorage.setItem('app-unit', unit);
    }, [unit]);

    const toggleUnit = () => {
        setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
    };

    const convertTemp = (temp: number) => {
        if (unit === 'imperial') {
            return Math.round((temp * 9 / 5) + 32);
        }
        return Math.round(temp);
    };

    const convertWindSpeed = (speed: number) => {
        if (unit === 'imperial') {
            return (speed * 2.237).toFixed(1);
        }
        return speed.toFixed(1);
    };

    const unitSymbol = unit === 'metric' ? '°C' : '°F';
    const windUnit = unit === 'metric' ? 'm/s' : 'mph';

    const value = {
        unit,
        setUnit,
        toggleUnit,
        convertTemp,
        convertWindSpeed,
        unitSymbol,
        windUnit
    };

    return (
        <UnitContext.Provider value={value}>
            {children}
        </UnitContext.Provider>
    );
}

export const useUnit = () => {
    const context = useContext(UnitContext);
    if (context === undefined) {
        throw new Error('useUnit must be used within a UnitProvider');
    }
    return context;
};
