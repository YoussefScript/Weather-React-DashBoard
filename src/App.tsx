import DailyForecast from './components/cards/DailyForecast';
import HourlyForecast from './components/cards/HourlyForecast';
import CurrentWeather from './components/cards/CurrentWeather';
import AdditionalInfo from './components/cards/AdditionalInfo';
import Map from './components/Map';
import { useState } from 'react';
import { Coords } from './types';
import Location from './components/dropDowns/Location';

function App() {

  const [coords, setCoords] = useState<Coords>({ lat: 24.0889, lon: 32.8998 });

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
  }

  return (
    <div className='flex flex-col gap-8'>
      <Location onLocationChange={onMapClick} />
      <Map coords={coords} onMapClick={onMapClick} />
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords} />
      <DailyForecast coords={coords} />
      <AdditionalInfo coords={coords} />
    </div>
  );
}

export default App;