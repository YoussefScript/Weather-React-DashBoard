import DailyForecast from './components/cards/DailyForecast';
import HourlyForecast from './components/cards/HourlyForecast';
import CurrentWeather from './components/cards/CurrentWeather';
import AdditionalInfo from './components/cards/AdditionalInfo';
import Map from './components/Map';
import { useState } from 'react';
import { Coords } from './types';
import Location from './components/dropDowns/Location';
import WeatherLayerSelect, { WeatherLayer } from './components/dropDowns/WeatherLayerSelect';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 24.0889, lon: 32.8998 });
  const [selectedLayer, setSelectedLayer] = useState<WeatherLayer>("none");

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="weather-app-theme">
      <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-10 flex flex-col gap-6 md:gap-10 animate-in fade-in duration-700'>
          {/* Header Section */}
          <header className='flex flex-col md:flex-row justify-between items-center gap-4 p-4 md:p-5 rounded-2xl bg-card/50 backdrop-blur-xl border border-border/60 shadow-lg'>
            <div className='flex flex-col gap-1 text-center md:text-left'>
              <h1 className='text-xl md:text-2xl font-semibold tracking-tight'>
                SkyCast
              </h1>
              <p className='text-muted-foreground text-xs md:text-sm font-medium tracking-wide uppercase'>
                Weather Intelligence
              </p>
            </div>

            <div className='flex flex-wrap justify-center items-center gap-3 md:gap-4 w-full md:w-auto'>
              <div className='flex flex-col sm:flex-row gap-2 p-1.5 rounded-xl bg-background/60 border border-border/60 w-full sm:w-auto'>
                <Location onLocationChange={onMapClick} />
                <WeatherLayerSelect value={selectedLayer} onChange={setSelectedLayer} />
              </div>
              <ThemeToggle />
            </div>
          </header>

          {/* Main Content Grid */}
          <main className='grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8'>
            {/* Left Column - Map & Major Info */}
            <div className='lg:col-span-8 flex flex-col gap-6 md:gap-8'>
              <section className='overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 shadow-xl'>
                <Map coords={coords} onMapClick={onMapClick} selectedLayer={selectedLayer} />
              </section>
              <HourlyForecast coords={coords} />
            </div>

            {/* Right Column - Current & Details */}
            <div className='lg:col-span-4 flex flex-col gap-6 md:gap-8'>
              <CurrentWeather coords={coords} />
              <AdditionalInfo coords={coords} />
              <DailyForecast coords={coords} />
            </div>
          </main>

          {/* Footer */}
          <footer className='py-6 md:py-8 text-center text-muted-foreground text-xs font-medium border-t border-border/30 mt-4 md:mt-8'>
            <p>(c) {new Date().getFullYear()} SkyCast Weather. Developed by Youssef Emad Kamel.</p>
            <p className="mt-1 opacity-50 italic">Powered by OpenWeather & MapTiler</p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
