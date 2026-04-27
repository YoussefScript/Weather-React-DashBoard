import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    isRtl: boolean;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        'app.title': 'SkyCast',
        'app.subtitle': 'Weather Intelligence',
        'app.footer': '© {year} SkyCast Weather. Developed by Youssef Emad Kamel.',
        'app.poweredBy': 'Powered by OpenWeather & MapTiler',
        'search.placeholder': 'Search city...',
        'search.notFound': 'City not found. Please try again.',
        'location.current': 'Use Current Location',
        'location.live': 'Live Location',
        'location.notSupported': 'Geolocation is not supported by your browser',
        'location.denied': 'User denied the request for Geolocation. Please enable it in your browser settings.',
        'location.unavailable': 'Location information is unavailable.',
        'location.timeout': 'The request to get user location timed out.',
        'theme.dark': 'Dark Mode',
        'theme.light': 'Light Mode',
        'theme.mode': 'Theme',
        'language.label': 'Language',
        'weather.tempLabel': 'Temperature',
        'map.show': 'Show Map',
        'map.hide': 'Hide Map',
        'weather.currentIn': 'Current Weather in {city}',
        'weather.hourly': 'Hourly Forecast',
        'weather.daily': 'Daily Forecast',
        'weather.additionalInfo': 'Additional Weather Info',
        'weather.localTime': 'Local Time',
        'weather.sunrise': 'Sunrise',
        'weather.sunset': 'Sunset',
        'weather.humidity': 'Humidity',
        'weather.pressure': 'Pressure',
        'weather.wind': 'Wind',
        'weather.feelsLike': 'Feels like',
        'weather.clouds': 'Clouds',
        'weather.cloudiness': 'Cloudiness (%)',
        'weather.visibility': 'Visibility',
        'weather.uv': 'UV Index',
        'weather.windSpeed': 'Wind Speed',
        'weather.windDirection': 'Wind Direction',
        'weather.day': 'Day',
        'weather.high': 'High',
        'weather.low': 'Low',
        'weather.feels': 'Feels',
        'weather.ms': 'm/s',
        'unit.celsius': 'Celsius',
        'unit.fahrenheit': 'Fahrenheit',
    },
    ar: {
        'app.title': 'سكاي كاست',
        'app.subtitle': 'ذكاء الطقس',
        'app.footer': '© {year} سكاي كاست للطقس. تطوير يوسف عماد كامل .',
        'app.poweredBy': 'بدعم من OpenWeather و MapTiler',
        'search.placeholder': 'ابحث عن مدينة...',
        'search.notFound': 'المدينة غير موجودة. يرجى المحاولة مرة أخرى.',
        'location.current': 'استخدم الموقع الحالي',
        'location.live': 'الموقع المباشر',
        'location.notSupported': 'متصفحك لا يدعم خاصية تحديد الموقع',
        'location.denied': 'رفض المستخدم طلب تحديد الموقع. يرجى تفعيله من إعدادات المتصفح.',
        'location.unavailable': 'معلومات الموقع غير متوفرة.',
        'location.timeout': 'انتهت مهلة طلب الحصول على موقع المستخدم.',
        'location.unknown': 'حدث خطأ غير معروف.',
        'theme.dark': 'الوضع المظلم',
        'theme.light': 'الوضع المضيء',
        'theme.mode': 'المظهر',
        'language.label': 'اللغة',
        'weather.tempLabel': 'الحرارة',
        'map.show': 'إظهار الخريطة',
        'map.hide': 'إخفاء الخريطة',
        'weather.currentIn': 'الطقس الحالي في {city}',
        'weather.hourly': 'توقعات الساعات القادمة',
        'weather.daily': 'توقعات الأيام القادمة',
        'weather.additionalInfo': 'معلومات إضافية',
        'weather.localTime': 'الوقت المحلي',
        'weather.sunrise': 'شروق الشمس',
        'weather.sunset': 'غروب الشمس',
        'weather.humidity': 'الرطوبة',
        'weather.pressure': 'الضغط',
        'weather.wind': 'الرياح',
        'weather.feelsLike': 'درجة الحرارة المحسوسة',
        'weather.clouds': 'الغيوم',
        'weather.cloudiness': 'نسبة الغيوم (%)',
        'weather.visibility': 'الرؤية',
        'weather.uv': 'مؤشر الأشعة فوق البنفسجية',
        'weather.windSpeed': 'سرعة الرياح',
        'weather.windDirection': 'اتجاه الرياح',
        'weather.day': 'اليوم',
        'weather.high': 'عظمى',
        'weather.low': 'صغرى',
        'weather.feels': 'محسوسة',
        'weather.ms': 'م/ث',
        'unit.celsius': 'سيليزيوس',
        'unit.fahrenheit': 'فهرنهايت',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem('app-language');
        return (saved as Language) || 'en';
    });

    useEffect(() => {
        localStorage.setItem('app-language', language);
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    const value = {
        language,
        setLanguage,
        t,
        isRtl: language === 'ar'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
