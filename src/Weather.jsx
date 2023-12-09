import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faCloudRain,
  faSnowflake,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [apiKey] = useState("3f17dc5cb0ab8c198d00466e791151d3"); // Replace with your OpenWeatherMap API key

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(
          "Weather data not available for the specified city"
        );
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return <FontAwesomeIcon icon={faSun} />;
      case "Clouds":
        return <FontAwesomeIcon icon={faCloud} />;
      case "Rain":
        return <FontAwesomeIcon icon={faCloudRain} />;
      case "Snow":
        return <FontAwesomeIcon icon={faSnowflake} />;
      case "Mist":
        return <FontAwesomeIcon icon={faCloud} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex-col items-center justify-center bg-bg py-6">
      <h1 className="text-4xl mb-5 font-bold text-text text-center">Weather App</h1>
      <div className="text-text w-100 mx-20 flex flex-col items-center justify-center mt-10">
        <div className="flex w-100">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="px-4 py-2 rounded-md border-none border-b-2 border-black outline-none mx-5 text-black w-100"
          />
          <button
            onClick={fetchWeatherData}
            className="text-2xl"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {weatherData && (
          <div className="mt-10 flex flex-col justify-center items-center">
            <h2 className="text-5xl font-semibold">
              {`${weatherData.name}, `}
              <span className="text-5xl">{weatherData.sys.country}</span>
            </h2>
            <div className="text-[100px] my-4">
              {getWeatherIcon(weatherData.weather[0].main)}
            </div>
            <p>Wind speed: {weatherData.wind.speed}</p>
            <p className="mt-2">Temperature: {weatherData.main.temp}°C</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
