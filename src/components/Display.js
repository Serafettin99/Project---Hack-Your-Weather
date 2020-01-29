import React from 'react';

export default function City({ data }) {
  const { name, sys, weather, main, coord } = data;
  return (
    <div className="city">
      <h1>
        {name}, {sys.country}
      </h1>
      <div>
        <h2>{weather[0].main}</h2>
        <h4> {weather[0].description} </h4>
      </div>
      <p>min temp: {main.temp_min}</p>
      <p>max temp: {main.temp_max}</p>
      <p>
        location: {coord.lat}, {coord.lon}
      </p>
    </div>
  );
}
