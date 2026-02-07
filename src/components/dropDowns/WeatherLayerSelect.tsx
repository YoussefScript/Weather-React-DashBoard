import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type WeatherLayer =
    | "none"
    | "clouds_new"
    | "precipitation_new"
    | "pressure_new"
    | "wind_new"
    | "temp_new";

interface WeatherLayerSelectProps {
    value: WeatherLayer;
    onChange: (layer: WeatherLayer) => void;
}

const layers: { value: WeatherLayer; label: string }[] = [
    { value: "none", label: "No Layer" },
    { value: "clouds_new", label: "☁️ Clouds" },
    { value: "precipitation_new", label: "🌧️ Precipitation" },
    { value: "pressure_new", label: "📊 Pressure" },
    { value: "wind_new", label: "💨 Wind Speed" },
    { value: "temp_new", label: "🌡️ Temperature" },
];

export default function WeatherLayerSelect({ value, onChange }: WeatherLayerSelectProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select weather layer" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    {layers.map((layer) => (
                        <SelectItem key={layer.value} value={layer.value}>
                            {layer.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
