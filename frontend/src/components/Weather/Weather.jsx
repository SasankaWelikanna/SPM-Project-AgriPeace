import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const WEATHER_API_KEY = "3698e8d6feea12ad4045f45e0d0d0625";

  // Current location (latitude, longitude)
  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      console.log("Weather data fetched:", response.data);
      setWeather(response.data); // Update the state with fetched weather data
      fetchCityName(lat, lon); // Fetch city name from reverse geocoding
      setLoading(false); // Disable loading after fetching
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please try again.");
      setLoading(false); // Disable loading on error
    }
  };

  // Fetch city name using reverse geocoding (Nominatim API)
  const fetchCityName = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const cityName =
        response.data.address.city ||
        response.data.address.town ||
        response.data.address.village;
      setCity(cityName);
      console.log("City name fetched:", cityName);
    } catch (error) {
      console.error("Error fetching city name:", error);
      setError("Failed to fetch city name.");
    }
  };

  // Use Geolocation API to get current location
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude); // Fetch weather based on user's location
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(
            "Failed to get your location. Please allow location access."
          );
          setLoading(false); // Disable loading on error
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false); // Disable loading on error
    }
  };

  useEffect(() => {
    fetchCurrentLocation(); // Fetch weather data on component mount
  }, []);

  return (
    <div className="mt-5">
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading weather data...</p>}
      {weather && !loading && (
        <div className="weather-card bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-xl font-bold dark:text-white text-center mb-2">
            Current Weather
          </h2>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col text-center sm:text-left">
              <h3 className="text-lg font-semibold dark:text-white">
                {city || weather.name}
              </h3>
              <p className="text-sm italic text-gray-600 dark:text-gray-300">
                {weather.weather[0].description}
              </p>
            </div>
            <div className="flex items-center justify-center sm:justify-start mt-3">
              <img
                className="w-16 h-16 sm:w-20 sm:h-20"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
              <div className="ml-2 sm:ml-4">
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
        </div>
      )}
    </div>
  );
};

export default Weather;
