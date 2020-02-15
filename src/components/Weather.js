import React, { useState } from 'react';
import Display from './Display';
import Search from './Search';
import './Weather.css';

const fixErrorMessage = (setErr, setMessage) => {
  setTimeout(() => {
    setErr(false);
    setMessage('');
  }, 1500);
};

export default function Weather() {
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchedDatas, setSearchedDatas] = useState([]);

  const getWeatherData = city => {
    if (
      searchedDatas.find(
        c => c.name.toLowerCase().trim() === city.toLowerCase().trim(),
      )
    ) {
      setHasError(true);
      setErrorMessage('Typed city has already been on the page');
      fixErrorMessage(setHasError, setErrorMessage);
      return;
    }
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`,
    )
      .then(res => {
        if (res.ok) return res.json();
        else return res.text();
      })
      .then(data => {
        if (data instanceof Object) {
          setWeatherData(data);
          setErrorMessage('');
          setSearchedDatas([data, ...searchedDatas]);
          setHasError(false);
        } else {
          setHasError(true);
          setErrorMessage(JSON.parse(data).message);
          fixErrorMessage(setHasError, setErrorMessage);
        }
      })
      .catch(err => {
        setWeatherData({});
        setHasError(true);
        setErrorMessage(err.message);
      })
      .finally(() => setIsLoading(false));
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
            <li key={searchedData.sys.id}>
              <Display data={searchedData} deleteData={deleteWeatherData} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
