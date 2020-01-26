import React, { useState, useEffect } from 'react';
import City from './City';
import Form from './Form';

const Cities = () => {
  const [weatherCondition, setWeatherCondition] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const [introMessage, setIntroMessage] = useState(
    'Please enter a city name...',
  );
  const [errorMessage, setErrorMessage] = useState('');
  const getCity = city => {
    setErrorMessage('');
    setIntroMessage('');

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`,
    )
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            setWeatherCondition(data);
            setErrorMessage('');
            setError(false);
            setLoading(false);
            console.log(weatherCondition);
          });
        } else {
          setErrorMessage('Please insert a valid city name...');
          setLoading(null);
        }
      })
      .catch(error => {
        setError(true);
        setLoading(false);
        setErrorMessage('Error: Failed to fetch');
      });
  };
  return (
    <div className="cities">
      <Form getCity={getCity} />
      <h2>{introMessage}</h2>
      {isLoading && <h2>Loading....</h2>}
      {isLoading === null && <h1>{errorMessage}</h1>}
      {hasError && <h1>Failed to get data...</h1>}
      {isLoading === false && !hasError && (
        <div>
          <City data={weatherCondition} />
        </div>
      )}
    </div>
  );
};

export default Cities;
