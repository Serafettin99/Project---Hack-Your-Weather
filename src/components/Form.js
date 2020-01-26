import React, { useState } from 'react';

export default function Form({ getCity }) {
  const [city, setCity] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    getCity(city);
    setCity('');
  };

  // const handleChange = e => setCity(e.target.value);

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
        <input type="Submit" value="Search" />
      </form>
    </div>
  );
}
