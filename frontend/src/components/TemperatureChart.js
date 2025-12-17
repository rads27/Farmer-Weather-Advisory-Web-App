// ===========================================
// TEMPERATURE CHART COMPONENT - TemperatureChart.js
// ===========================================


import React from 'react';

// =========================================
// COMPONENT FUNCTION
// =========================================


function TemperatureChart({ forecast }) {
 
  if (!forecast || forecast.length === 0) {
    return null;
  }

  // =========================================
  // CALCULATE CHART DATA
  // =========================================
  
  
  const temperatures = forecast.map(item => item.temperature);
  const minTemp = Math.min(...temperatures) - 2;  
  const maxTemp = Math.max(...temperatures) + 2;  
  const tempRange = maxTemp - minTemp;

  // =========================================
  // HELPER: CALCULATE BAR HEIGHT
  // =========================================

  const calculateBarHeight = (temp) => {
    if (tempRange === 0) return 50;  
    return ((temp - minTemp) / tempRange) * 100;
  };

  // =========================================
  // HELPER: FORMAT TIME
  // =========================================
  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  // =========================================
  // RENDER THE UI
  // =========================================
  return (
    <div className="temperature-chart">
      {/* Section heading */}
      <h2 className="section-title">📊 Temperature Trend</h2>
      
      {/* Chart container */}
      <div className="chart-container">
        {/* Y-axis labels */}
        <div className="chart-y-axis">
          <span>{Math.round(maxTemp)}°C</span>
          <span>{Math.round((maxTemp + minTemp) / 2)}°C</span>
          <span>{Math.round(minTemp)}°C</span>
        </div>
        
        {/* Chart bars */}
        <div className="chart-bars">
          {forecast.map((item, index) => (
            <div key={index} className="chart-bar-container">
              {/* Bar with dynamic height */}
              <div 
                className="chart-bar"
                style={{ 
                  height: `${calculateBarHeight(item.temperature)}%` 
                }}
                title={`${item.temperature}°C`}
              >
                {/* Temperature label on top of bar */}
                <span className="bar-label">{item.temperature}°</span>
              </div>
              
              {/* Time label below bar */}
              <span className="bar-time">{formatTime(item.dateTime)}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Rain probability chart */}
      <h3 className="chart-subtitle">🌧️ Rain Probability</h3>
      <div className="rain-chart">
        {forecast.map((item, index) => (
          <div key={index} className="rain-bar-container">
            {/* Rain bar with percentage height */}
            <div 
              className="rain-bar"
              style={{ height: `${item.rainProbability}%` }}
              title={`${item.rainProbability}% chance of rain`}
            >
              {item.rainProbability > 20 && (
                <span className="rain-label">{item.rainProbability}%</span>
              )}
            </div>
            <span className="bar-time">{formatTime(item.dateTime)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


export default TemperatureChart;
