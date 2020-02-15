import React, { useState } from 'react';
import './Search.css';

export default function Form({ getData }) {
  const [city, setCity] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    getData(city);
    setCity('');
  };

  const preventEmptySearch = () => (city < 1 ? true : false);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search City"
          name="city"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <input type="Submit" value="Search" disabled={preventEmptySearch()} />
      </form>
    </div>
  );
}
