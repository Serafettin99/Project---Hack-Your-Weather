import React, { useState } from 'react';
import Display from './Display';
import Search from './Search';

export default function Weather() {
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getWeatherData = city => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`,
    )
      .then(res => {
        if (res.ok) return res.json();
        else throw new Error('Please insert a valid city name...');
      })
      .then(data => {
        setWeatherData(data);
        setErrorMessage(false);
        setIsLoading(false);
      })
      .catch(err => {
        setWeatherData({});
        setHasError(true);
        setIsLoading(false);
        setErrorMessage(err.message);
      });
  };

  if (isLoading) return <h1> Loading...</h1>;
  return (
    <div>
      <Search getData={getWeatherData} />
      {hasError && <h2>{errorMessage}</h2>}
      {weatherData.name && <Display data={weatherData} />}
    </div>
  );
}
