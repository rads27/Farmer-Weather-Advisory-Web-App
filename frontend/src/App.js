// ===========================================
// MAIN APP COMPONENT - App.js
// ===========================================
import React, { useState, useEffect } from 'react';

import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import AdvisoryBox from './components/AdvisoryBox';
import RecentSearches from './components/RecentSearches';
import TemperatureChart from './components/TemperatureChart';

// ===========================================
// MAIN APP FUNCTION
// ===========================================
function App() {
  // =========================================
  // STATE VARIABLES
  // =========================================
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [advisories, setAdvisories] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // =========================================
  // BACKEND SERVER URL
  // =========================================
  // This is where our Express server is running
  const BACKEND_URL = 'http://localhost:5000';

  // =========================================
  // FETCH RECENT SEARCHES ON PAGE LOAD
  // =========================================
  useEffect(() => {
    // Define an async function to fetch recent searches
    const fetchRecentSearches = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/recent-searches`);
        
        const data = await response.json();
        
        if (data.success) {
          setRecentSearches(data.recentSearches);
        }
      } catch (error) {
        console.log('Could not fetch recent searches:', error.message);
      }
    };

    // Call the function
    fetchRecentSearches();
  }, []);  // Empty array = run only once on page load

  // =========================================
  // FUNCTION: FETCH WEATHER DATA
  // =========================================

  const fetchWeather = async (location) => {
    // Don't search if location is empty
    if (!location.trim()) {
      setErrorMessage('Please enter a city name.');
      return;
    }

    // Clear previous error and start loading
    setErrorMessage('');
    setIsLoading(true);

    try {

      const response = await fetch(
        `${BACKEND_URL}/api/weather?location=${encodeURIComponent(location)}`
      );

      // Convert the response to JSON format
      const data = await response.json();

      // Check if the request was successful
      if (data.success) {
        // Update all our state variables with the new data
        setWeatherData(data.currentWeather);
        setForecastData(data.forecast);
        setAdvisories(data.advisories);
        setErrorMessage('');

        // Add the searched location to recent searches (if not already there)
        if (!recentSearches.includes(data.currentWeather.cityName)) {
          const updatedSearches = [
            data.currentWeather.cityName,
            ...recentSearches
          ].slice(0, 5);
          
          setRecentSearches(updatedSearches);
        }
      } else {
        // If API returned an error, show it to the user
        setErrorMessage(data.error || 'Could not fetch weather data.');
        setWeatherData(null);
        setForecastData([]);
        setAdvisories([]);
      }
    } catch (error) {
      // Handle network errors (server not running, no internet, etc.)
      console.error('Error:', error);
      setErrorMessage(
        'Could not connect to server. Make sure the backend is running on port 5000.'
      );
      setWeatherData(null);
      setForecastData([]);
      setAdvisories([]);
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  // RENDER THE UI
  // =========================================

  return (
    <div className="app">
      {/* ======= HEADER SECTION ======= */}
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">🌤️ GoodWeather App</h1>
          <p className="header-subtitle">
            Get weather forecasts and farming advice for your location
          </p>
        </div>
      </header>

      {/* ======= MAIN CONTENT ======= */}
      <main className="main-container">
        {/* ======= SEARCH SECTION ======= */}
        <section className="search-section">
          {/* SearchBar component - handles user input */}
          <SearchBar 
            onSearch={fetchWeather}    // Pass the fetch function
            isLoading={isLoading}      // Pass loading state
          />
          
          {/* Recent Searches component */}
          <RecentSearches 
            searches={recentSearches}   // Pass search history
            onSearchClick={fetchWeather} // Allow clicking on past searches
          />
        </section>

        {/* ======= ERROR MESSAGE ======= */}
        {/* Only show this if there's an error */}
        {errorMessage && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {errorMessage}
          </div>
        )}

        {/* ======= LOADING INDICATOR ======= */}
        {/* Only show while loading */}
        {isLoading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Fetching weather data...</p>
          </div>
        )}

        {/* ======= WEATHER DATA SECTIONS ======= */}
        {/* Only show if we have weather data and not loading */}
        {weatherData && !isLoading && (
          <>
            {/* Current Weather Card */}
            <section className="weather-section">
              <CurrentWeather weather={weatherData} />
            </section>

            {/* Advisory Box - Farming Tips */}
            <section className="advisory-section">
              <AdvisoryBox advisories={advisories} />
            </section>

            {/* Temperature Chart */}
            <section className="chart-section">
              <TemperatureChart forecast={forecastData} />
            </section>

            {/* 5-Day Forecast */}
            <section className="forecast-section">
              <Forecast forecast={forecastData} />
            </section>
          </>
        )}

        {/* ======= WELCOME MESSAGE ======= */}
        {/* Show when no weather data has been fetched yet */}
        {!weatherData && !isLoading && !errorMessage && (
          <div className="welcome-message">
            <div className="welcome-icon">🌱</div>
            <h2>Welcome!</h2>
            <p>Enter your city name above to get weather forecasts and farming advisories.</p>
            <div className="welcome-tips">
              <h3>What you'll get:</h3>
              <ul>
                <li>📊 Current temperature, humidity, and wind speed</li>
                <li>🌧️ Rain probability for planning irrigation</li>
                <li>📅 5-day weather forecast</li>
                <li>💡 Smart farming advisories based on weather</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* ======= FOOTER ======= */}
      <footer className="footer">
        <p>GoodWeather App | Data from OpenWeatherMap</p>
        <p>Made by Radhika Salodkar | 4th year | Computer Engineering | UID: 22001081</p>
      </footer>
    </div>
  );
}
export default App;
