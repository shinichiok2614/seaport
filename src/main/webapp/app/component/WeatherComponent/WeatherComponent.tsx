// WeatherComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeatherComponent.css'; // Import tệp CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faEye,
  faMapMarkerAlt,
  faSun,
  faTachometerAlt,
  faTemperatureHigh,
  faThermometerHalf,
  faTint,
  faWind,
} from '@fortawesome/free-solid-svg-icons';

const api = {
  key: 'ad46a874f8090a9411f511c21436ea82',
  base: 'https://api.openweathermap.org/data/2.5/',
};
interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}
const WeatherComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('hanoi');
  // const [weather, setWeather] = useState({});
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setLoading(false);
        // setWeather(result);

        if (result.cod === 200) {
          setWeather(result);
        } else {
          setWeather(null);
          setError(result.message || 'City not found');
        }
        console.log(result);
      });
  };
  useEffect(() => {
    searchPressed();
  }, []);
  return (
    <div className="weather-component">
      <div>
        <input
          type="text"
          placeholder="Enter city/town..."
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={searchPressed}>Search</button>
      </div>
      {loading && <p>Loading weather data...</p>}
      {error && <p>Error: {error}</p>}
      {weather && (
        <div className="weather-details">
          <h3>Weather in {weather.name}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div className="weather-item">
            <FontAwesomeIcon icon={faTemperatureHigh} />
            <p>Temperature: {weather.main.temp}°C</p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faThermometerHalf} />
            <p>Feels Like: {weather.main.feels_like}°C</p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faThermometerHalf} />
            <p>Min Temperature: {weather.main.temp_min}°C</p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faThermometerHalf} />
            <p>Max Temperature: {weather.main.temp_max}°C</p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <p>Pressure: {weather.main.pressure} hPa</p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faTint} />
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faEye} />
            <p>Visibility: {weather.visibility} meters</p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faWind} />
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <p>Wind Direction: {weather.wind.deg}°</p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faCloud} />
            <p>Cloudiness: {weather.clouds.all}%</p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faSun} />
            <p>Weather: {weather.weather[0].main}</p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faSun} />
            <p>Description: {weather.weather[0].description}</p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <p>Country: {weather.sys.country}</p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faSun} />
            <p>
              Sunrise:{' '}
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
          </div>
          <div className="weather-item">
            <FontAwesomeIcon icon={faSun} />
            <p>
              Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
