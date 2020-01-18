import React from 'react';
import City from './City';
import CitiesData from '../city-weather.json';

export default function Cities() {
  return (
    <div className="cities">
      {CitiesData.map(cityData => (
        <City key={cityData.sys.id} data={cityData} />
      ))}
    </div>
  );
}
