import React, { useEffect } from 'react';
import useCurrentWeather from '../hooks/useCurrentWeather';

export default function Weather() {
  const { data } = useCurrentWeather();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>Weather</div>;
}
