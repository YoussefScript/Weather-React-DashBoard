import { useLanguage } from "./LanguageProvider";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

export function LanguageToggle() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <Button
            variant="ghost"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-3 px-4 h-12 md:h-14 rounded-2xl transition-all duration-300 hover:bg-accent font-bold bg-card/40 border border-border/40 shadow-sm w-full"
        >
            <div className="relative w-6 h-6 flex items-center justify-center bg-primary/10 rounded-lg">
                <Languages className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col items-start leading-tight">
                <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">
                    {t('language.label')}
                </span>
                <div className="flex items-center gap-1.5 text-sm md:text-base font-extrabold">
                    <span className={language === 'ar' ? 'text-primary' : ''}>AR</span>
                    <div className="w-px h-3 bg-border/60" />
                    <span className={language === 'en' ? 'text-primary' : ''}>EN</span>
                </div>
            </div>
        </Button>
    );
}
