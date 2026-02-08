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
            className="flex items-center gap-2 px-3 h-10 rounded-xl transition-all duration-300 hover:bg-accent hover:text-accent-foreground group"
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                <Sun className={`h-5 w-5 transition-all ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
                <Moon className={`absolute h-5 w-5 transition-all ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline-block">
                {isDark ? t('theme.dark') : t('theme.light')}
            </span>
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
