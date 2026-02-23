import { Thermometer } from "lucide-react";
import { useUnit } from "./UnitProvider";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageProvider";

export function UnitToggle() {
    const { unit, toggleUnit } = useUnit();
    const { t } = useLanguage();

    return (
        <Button
            variant="ghost"
            onClick={toggleUnit}
            className="flex items-center gap-3 px-4 h-12 md:h-14 rounded-2xl transition-all duration-300 hover:bg-accent hover:text-accent-foreground group bg-card/40 border border-border/40 shadow-sm w-full"
        >
            <div className="relative w-6 h-6 flex items-center justify-center bg-primary/10 rounded-lg">
                <Thermometer className="h-5 w-5 text-primary transition-all group-hover:scale-110" />
            </div>
            <div className="flex flex-col items-start leading-tight">
                <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">
                    {t('weather.tempLabel')}
                </span>
                <span className="text-sm md:text-base font-extrabold truncate">
                    {unit === 'metric' ? t('unit.celsius') : t('unit.fahrenheit')}
                </span>
            </div>
        </Button>
    );
}
