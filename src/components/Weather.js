import React, { useState } from 'react';
import Display from './Display';
import Search from './Search';
import './Weather.css';

export default function Weather() {
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchedDatas, setSearchedDatas] = useState([]);

  const getWeatherData = city => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`,
    )
      .then(res => {
        if (res.ok) return res.json();
        else throw new Error('Please insert a valid city name...');
      })
      .then(data => {
        setWeatherData(data);
        setSearchedDatas([data, ...searchedDatas]);
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

  const deleteWeatherData = id => {
    setSearchedDatas(
      searchedDatas.filter(searchedData => searchedData.id !== id),
    );
  };

  if (isLoading) return <h1> Loading...</h1>;
  return (
    <div>
      <Search getData={getWeatherData} />
      {hasError && <h2>{errorMessage}</h2>}
      {weatherData.name && (
        <ul>
          {searchedDatas.map(searchedData => (
            <li>
              <Display
                data={searchedData}
                key={searchedData.sys.id}
                deleteData={deleteWeatherData}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
