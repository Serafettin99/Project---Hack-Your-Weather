import React from 'react';
import './Display.css';

export default function City({ data, deleteData }) {
  const { name, sys, weather, main, coord, id } = data;

  return (
    <div className="city">
      <div className="button-container">
        <button onClick={() => deleteData(id)}>X</button>
      </div>
      <h1>
        {name}, {sys.country}
      </h1>
      <div>
        <h2>{weather[0].main}</h2>
        <h4> {weather[0].description} </h4>
      </div>
      <p>min temp: {main.temp_min}&#176;C</p>
      <p>max temp: {main.temp_max}&#176;C</p>
      <p>
        location: {coord.lat}, {coord.lon}
      </p>
    </div>
  );
}
