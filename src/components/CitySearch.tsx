import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { getGeocode } from "../api";
import { useLanguage } from "./LanguageProvider";

interface CitySearchProps {
    onCitySelect: (lat: number, lon: number) => void;
}

export default function CitySearch({ onCitySelect }: CitySearchProps) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const { t, isRtl } = useLanguage();

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try {
            const geocodeData = await getGeocode(query);
            onCitySelect(geocodeData.lat, geocodeData.lon);
            setQuery("");
        } catch (error) {
            console.error("Geocoding failed:", error);
            alert(t('search.notFound'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className={`flex items-center gap-2 bg-background/50 border border-border/60 rounded-lg px-2 py-1 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 w-full sm:w-[200px] md:w-[250px] ${isRtl ? 'flex-row-reverse' : ''}`}
        >
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search.placeholder')}
                className={`bg-transparent border-none outline-none text-xs font-medium w-full placeholder:text-muted-foreground/60 ${isRtl ? 'text-right' : 'text-left'}`}
            />
            {query.trim() && (
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                    disabled={loading}
                >
                    {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Search className="w-3 h-3" />}
                </Button>
            )}
        </form>
    );
}
