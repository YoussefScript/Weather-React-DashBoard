import { Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

interface LiveLocationProps {
    onLocationUpdate: (lat: number, lon: number) => void;
}

export default function LiveLocation({ onLocationUpdate }: LiveLocationProps) {
    const [loading, setLoading] = useState(false);
    const { t } = useLanguage();

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert(t("location.notSupported"));
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                onLocationUpdate(latitude, longitude);
                setLoading(false);
            },
            (error) => {
                let messageKey = "location.unknown";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        messageKey = "location.denied";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        messageKey = "location.unavailable";
                        break;
                    case error.TIMEOUT:
                        messageKey = "location.timeout";
                        break;
                }
                alert(t(messageKey));
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    };

    return (
        <Button
            onClick={handleGetLocation}
            disabled={loading}
            variant="outline"
            className="group flex items-center gap-2 bg-background/50 border-border/60 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
        >
            <Navigation className={`w-4 h-4 text-primary transition-all duration-500 ${loading ? 'animate-pulse scale-110' : 'group-hover:rotate-12'}`} />
            <span className="hidden sm:inline">{t('location.current')}</span>
            <span className="sm:hidden">{t('location.live')}</span>
        </Button>
    );
}
