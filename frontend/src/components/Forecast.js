// ===========================================
// FORECAST COMPONENT - Forecast.js
// ===========================================

import React from 'react';

// =========================================
// COMPONENT FUNCTION
// =========================================

function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  // =========================================
  // HELPER: FORMAT DATE AND TIME
  // =========================================
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    
    const dateOptions = { month: 'short', day: 'numeric' };
    
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    
    const dateStr = date.toLocaleDateString('en-US', dateOptions);
    const timeStr = date.toLocaleTimeString('en-US', timeOptions);
    
    return { date: dateStr, time: timeStr };
  };

  // =========================================
  // HELPER: GET WEATHER ICON URL
  // =========================================
  const getIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  // =========================================
  // RENDER THE UI
  // =========================================
  return (
    <div className="forecast">
      {/* Section heading */}
      <h2 className="section-title">📅 Weather Forecast (Next 30 Hours)</h2>
      
      {/* Forecast cards container */}
      <div className="forecast-grid">
        {/* Loop through each forecast item and create a card */}
        {forecast.map((item, index) => {
     
          const { date, time } = formatDateTime(item.dateTime);
          
          return (
            <div key={index} className="forecast-card">
              {/* Date and time */}
              <div className="forecast-datetime">
                <span className="forecast-date">{date}</span>
                <span className="forecast-time">{time}</span>
              </div>
              
              {/* Weather icon */}
              <img 
                src={getIconUrl(item.icon)} 
                alt={item.description}
                className="forecast-icon"
              />
              
              {/* Temperature */}
              <div className="forecast-temp">
                {item.temperature}°C
              </div>
              
              {/* Weather description */}
              <div className="forecast-desc">
                {item.description}
              </div>
              
              {/* Additional details */}
              <div className="forecast-details">
                <span title="Rain probability">🌧️ {item.rainProbability}%</span>
                <span title="Wind speed">💨 {item.windSpeed} km/h</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default Forecast;
