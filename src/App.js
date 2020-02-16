import React from 'react';
import './App.css';
import Weather from './components/Weather';
import WeatherDetails from './components/WeatherDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <h1>Weather</h1>
      <Switch>
        <Route path="/city/:cityId" exact component={WeatherDetails} />
        <Route path="/" exact component={Weather} />
      </Switch>
    </Router>
  );
}

export default App;
