import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './WeatherDetails.css';

export default function WeatherDetails({ match }) {
  const [fiveDaysForecast, setFiveDaysForecast] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchWeatherDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?id=${match.params.cityId}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`,
        );

        const data = await res.json();
        setFiveDaysForecast(data);
      } catch (error) {
        setHasError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeatherDetails();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  if (hasError) return <h2>Error occured!...</h2>;

  const { list, city } = fiveDaysForecast;

  return (
    <div className="display-container">
      <h2>5 Days Forecast</h2>
      <div>
        <h1>
          {city.name}, {city.country}
        </h1>
        <AreaChart
          width={800}
          height={350}
          data={list}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B8B6E8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#blue" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="dt_txt" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="main.temp"
            stroke="red"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </div>
      <Link to="/" className="link">
        Back
      </Link>
    </div>
  );
}
