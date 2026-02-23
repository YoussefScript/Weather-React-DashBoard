import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageProvider";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const { t } = useLanguage();

    // Check if the actual applied theme is dark
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    return (
        <Button
            variant="ghost"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex items-center gap-3 px-4 h-12 md:h-14 rounded-2xl transition-all duration-300 hover:bg-accent hover:text-accent-foreground group bg-card/40 border border-border/40 shadow-sm w-full"
        >
            <div className="relative w-6 h-6 flex items-center justify-center bg-accent/20 rounded-lg">
                <Sun className={`h-5 w-5 transition-all text-amber-500 ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
                <Moon className={`absolute h-5 w-5 transition-all text-indigo-400 ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
            </div>
            <div className="flex flex-col items-start leading-tight">
                <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">
                    {t('theme.mode') || 'Theme'}
                </span>
                <span className="text-sm md:text-base font-extrabold">
                    {isDark ? t('theme.dark') : t('theme.light')}
                </span>
            </div>
        </Button>
    );
}
