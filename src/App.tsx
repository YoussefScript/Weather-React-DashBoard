import './index.css';
import { useQuery } from '@tanstack/react-query';
import { getWeather } from './api';

function App() {

  const {data} = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({lat: '50', lon: '50'}),
  })

  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};

export default App