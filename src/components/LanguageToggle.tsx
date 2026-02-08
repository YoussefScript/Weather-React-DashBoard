import { useLanguage } from "./LanguageProvider";
import { Button } from "./ui/button";

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 px-3 h-10 rounded-xl transition-all duration-300 hover:bg-accent font-bold"
        >
            <span className={language === 'ar' ? 'text-primary' : 'text-muted-foreground'}>AR</span>
            <div className="w-px h-4 bg-border/60" />
            <span className={language === 'en' ? 'text-primary' : 'text-muted-foreground'}>EN</span>
        </Button>
    );
}
