# 🌦️ SkyCast Premium Weather Experience


SkyCast is a state-of-the-art, premium weather application built with **React 19**, **Tailwind CSS 4**, and **TypeScript**. It provides high-accuracy weather data coupled with a stunning glassmorphic UI, real-time map visualizations, and a seamless theme switching experience.
---

## ✨ Key Features

- 🌍 **Interactive Weather Map**: Powered by **MapTiler** and **Leaflet**, offering beautiful dark and light base styles.
- 🎯 **City Search & Geocoding**: Quick city selection from a global database with automatic coordinate conversion.
- 🌡️ **Comprehensive Data**: 
  - Current weather conditions with feels-like, humidity, and wind metrics.
  - Detailed 48-hour hourly forecast.
  - 5-day daily forecast.
  - Solar details (Sunrise/Sunset) and UV index.
- 🌓 **Next-Gen Theming**: Advanced Light/Dark mode with system preference detection and animated transitions.
- 💎 **Glassmorphic Design**: A premium aesthetic using backdrop filters, multi-layered shadows, and `oklch` color spaces.
- 🚀 **Performance Optimized**: Data fetching and caching powered by **TanStack Query (React Query)** to minimize API calls.

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Styling**: Tailwind CSS 4 (with OKLCH color support)
- **Maps**: Leaflet & MapTiler SDK
- **Data Fetching**: TanStack Query v5
- **Icons**: Lucide React
- **Validation**: Zod
- **Build Tool**: Vite

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (Latest LTS recommended)
- API Keys from:
  - [OpenWeatherMap](https://openweathermap.org/api) (One Call API 3.0)
  - [MapTiler](https://www.maptiler.com/cloud/)

### 2. Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
VITE_API_KEY=YOUR_OPENWEATHER_API_KEY
VITE_MAPTILER_API_KEY=YOUR_MAPTILER_API_KEY
```

### 4. Development
```bash
npm run dev
```

---

*Powered by OpenWeather API & MapTiler*
