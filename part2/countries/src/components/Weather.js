import React, { useState, useEffect } from "react";
import axios from "axios";
import countryStyles from "./country.module.scss";

const Weather = ({ country }) => {
  //initial state for weather
  const [weather, setWeather] = useState("");
  const [displayWeather, setDisplayWeather] = useState(false);
  console.log("weather: ", weather);
  console.log("weather.current: ", weather.current);
  //using API with the specific country capital name for weather as per docs
  useEffect(() => {
    const key = `4dd06535601b78b0aa3200a31a2a0f43`;
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${country.capital}`;
    axios.get(url).then(response => {
      console.log("response.data: ", response.data);
      setWeather(response.data.current); //updating state based off JSON values
      setDisplayWeather(true); //updating state
    });
  }, [country.capital]); //we want to only fetch data when the component mounts -> the effect depends on the query so when changed, data request is fired

  //using conditional flow; a) if init state of displayWeather is true, show the details b) loading/fetching data
  return (
    <div>
      {!displayWeather ? (
        <p>Please wait...</p>
      ) : (
        <div>
          <h3>Weather in {country.capital}</h3>
          <div className={countryStyles.iconContainer}>
            <img
              className={countryStyles.weatherIcon}
              src={weather.weather_icons}
              alt={weather.weather_descriptions}
            />
          </div>

          <p>
            Current time is{" "}
            <span className={countryStyles.detail}>
              {weather.observation_time}
            </span>
          </p>
          <p>
            <span className={countryStyles.detail}>Temperature:</span>{" "}
            {weather.temperature}c
          </p>
          <p>
            {" "}
            <span className={countryStyles.detail}>Conditions: </span>
            {weather.weather_descriptions}
          </p>

          <p>
            <span className={countryStyles.detail}>Wind: </span>{" "}
            {weather.wind_speed} kph {weather.wind_dir}
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
