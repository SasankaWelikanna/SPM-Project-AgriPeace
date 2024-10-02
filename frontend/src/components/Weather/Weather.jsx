import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const WEATHER_API_KEY = "3698e8d6feea12ad4045f45e0d0d0625";
  const LAT = 6.9271; // Latitude for Colombo
  const LON = 79.8612; // Longitude for Colombo

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${WEATHER_API_KEY}&units=metric`
      );
      console.log("Weather data fetched:", response.data);
      setWeather(response.data); // Update the state with fetched weather data
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please try again.");
    }
  };

  useEffect(() => {
    fetchWeather(); // Fetch weather data on component mount
  }, []);

  return (
    <div className="mt-5">
      {error && <p className="text-red-500">{error}</p>}
      {weather ? (
        <div className="weather-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold dark:text-white text-center mb-2">
            Current Weather
          </h2>
          <h3 className="text-lg font-semibold dark:text-white">
            {weather.name}
          </h3>
          <p className="text-sm italic text-gray-600 dark:text-gray-300">
            {weather.weather[0].description}
          </p>
          <div className="flex items-center mt-3">
            <img
              className="w-20 h-20"
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
            <div className="ml-4">
              <p className="text-xl font-bold dark:text-white">
                {weather.main.temp}°C
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Humidity: {weather.main.humidity}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Wind Speed: {weather.wind.speed} m/s
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
