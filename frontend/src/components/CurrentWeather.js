// ===========================================
// CURRENT WEATHER COMPONENT - CurrentWeather.js
// ===========================================


import React from 'react';

// =========================================
// COMPONENT FUNCTION
// =========================================


function CurrentWeather({ weather }) {
  if (!weather) {
    return null;
  }

  // =========================================
  // HELPER: GET WEATHER ICON URL
  // =========================================
 
  const getIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // =========================================
  // RENDER THE UI
  // =========================================
  return (
    <div className="current-weather">
      {/* Section heading */}
      <h2 className="section-title">Current Weather</h2>
      
      {/* Weather card container */}
      <div className="weather-card">
        {/* Location and weather icon */}
        <div className="weather-header">
          <div className="location-info">
            <h3 className="city-name">
              {weather.cityName}, {weather.country}
            </h3>
            <p className="weather-description">
              {weather.description}
            </p>
          </div>
          <img 
            src={getIconUrl(weather.icon)} 
            alt={weather.description}
            className="weather-icon"
          />
        </div>

        {/* Main temperature display */}
        <div className="temperature-main">
          <span className="temp-value">{weather.temperature}</span>
          <span className="temp-unit">°C</span>
        </div>
        <p className="feels-like">
          Feels like: {weather.feelsLike}°C
        </p>

        {/* Weather details grid */}
        <div className="weather-details">
          {/* Humidity */}
          <div className="detail-item">
            <span className="detail-icon">💧</span>
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weather.humidity}%</span>
          </div>

          {/* Wind Speed */}
          <div className="detail-item">
            <span className="detail-icon">💨</span>
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{weather.windSpeed} km/h</span>
          </div>

          {/* Rain Probability */}
          <div className="detail-item">
            <span className="detail-icon">🌧️</span>
            <span className="detail-label">Rain Chance</span>
            <span className="detail-value">{weather.rainProbability}%</span>
          </div>

          {/* Pressure */}
          <div className="detail-item">
            <span className="detail-icon">🔵</span>
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{weather.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
