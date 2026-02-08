import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getGeocode } from "@/api";
import { useState } from "react";

const cities = [
    "London",
    "Paris",
    "Berlin",
    "Rome",
    "Madrid",
    "Tokyo",
    "Dubai",
    "Cairo",
    "Aswan",
];

interface LocationProps {
    onLocationChange: (lat: number, lon: number) => void;
}

export default function Location({ onLocationChange }: LocationProps) {
    const [selectedCity, setSelectedCity] = useState<string>("");

    const handleCityChange = async (cityValue: string) => {
        setSelectedCity(cityValue);

        // Find the actual city name from the value
        const cityName = cities.find(
            (city) => city.toLowerCase().replace(/\s+/g, "-") === cityValue
        );

        if (cityName) {
            try {
                const geocodeData = await getGeocode(cityName);
                onLocationChange(geocodeData.lat, geocodeData.lon);
            } catch (error) {
                console.error("Failed to geocode city:", error);
            }
        }
    };

    return (
        <Select value={selectedCity} onValueChange={handleCityChange}>
            <SelectTrigger className="w-full sm:w-[220px]">
                <SelectValue placeholder="Select city" />
            </SelectTrigger>

            <SelectContent className="z-1001 max-h-300 overflow-y-auto">
                <SelectGroup>
                    {cities.map((city) => (
                        <SelectItem
                            key={city}
                            value={city.toLowerCase().replace(/\s+/g, "-")}
                        >
                            {city}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
