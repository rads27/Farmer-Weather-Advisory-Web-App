// ===========================================
// STEP 1: IMPORT REQUIRED PACKAGES
// ===========================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const mongoose = require('mongoose');

// ===========================================
// STEP 2: LOAD ENVIRONMENT VARIABLES
// ===========================================

dotenv.config();

// ===========================================
// STEP 3: CREATE THE EXPRESS APP
// ===========================================


const app = express();
const PORT = process.env.PORT || 5000;

// ===========================================
// STEP 4: SETUP MIDDLEWARE
// ===========================================

app.use(cors());
app.use(express.json());

// ===========================================
// STEP 5: CONNECT TO MONGODB DATABASE
// ===========================================
const connectToDatabase = async () => {
    try {
     
        await mongoose.connect(process.env.MONGODB_URI);
        
   
        console.log('✅ Connected to MongoDB successfully!');
    } catch (error) {
     
        console.log('❌ MongoDB connection failed:', error.message);
        console.log('⚠️  Server will still work, but recent searches won\'t be saved.');
    }
};

connectToDatabase();

// ===========================================
// STEP 6: CREATE MONGODB SCHEMA AND MODEL
// ===========================================

const searchHistorySchema = new mongoose.Schema({
    locationName: {
        type: String,        
        required: true       
    },
    searchDate: {
        type: Date,        
        default: Date.now  
    }
});
const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

// ===========================================
// STEP 7: HELPER FUNCTION - GENERATE FARMER ADVISORIES
// ===========================================



function generateAdvisories(weatherData) {
   
    const advisories = [];
    const temperature = weatherData.temperature;     
    const humidity = weatherData.humidity;           
    const windSpeed = weatherData.windSpeed;         
    const rainProbability = weatherData.rainProbability; 
    
    // ----------------------------------------
    // ADVISORY 1: High Rain Probability
    // ----------------------------------------
 
    if (rainProbability > 60) {
        advisories.push({
            type: 'warning',
            icon: '🌧️',
            message: 'Avoid irrigation and pesticide spraying today. High chance of rain detected.'
        });
    }
    
    // ----------------------------------------
    // ADVISORY 2: High Temperature
    // ----------------------------------------

    if (temperature > 35) {
        advisories.push({
            type: 'warning',
            icon: '🌡️',
            message: 'Increase irrigation frequency for heat-sensitive crops. Temperature is very high.'
        });
    }
    
    // ----------------------------------------
    // ADVISORY 3: High Wind Speed
    // ----------------------------------------

    if (windSpeed > 15) {
        advisories.push({
            type: 'warning',
            icon: '💨',
            message: 'Do not spray pesticides due to drift risk. Wind speed is too high.'
        });
    }
    
    // ----------------------------------------
    // ADVISORY 4: High Humidity
    // ----------------------------------------

    if (humidity > 80) {
        advisories.push({
            type: 'warning',
            icon: '💧',
            message: 'High humidity detected. Monitor crops for fungal infection and diseases.'
        });
    }
    
    // ----------------------------------------
    // ADVISORY 5: Good Spraying Conditions
    // ----------------------------------------

    if (windSpeed < 10 && rainProbability < 30) {
        advisories.push({
            type: 'good',
            icon: '✅',
            message: 'Good conditions for pesticide spraying. Low wind and no rain expected.'
        });
    }
    
    // ----------------------------------------
    // ADVISORY 6: Moderate Temperature (Bonus)
    // ----------------------------------------
 
    if (temperature >= 20 && temperature <= 30) {
        advisories.push({
            type: 'good',
            icon: '🌤️',
            message: 'Pleasant weather for outdoor farming activities.'
        });
    }
    
    // ----------------------------------------
    // ADVISORY 7: Frost Warning (Bonus)
    // ----------------------------------------
  
    if (temperature < 5) {
        advisories.push({
            type: 'warning',
            icon: '❄️',
            message: 'Risk of frost! Protect sensitive crops with covers.'
        });
    }
    

    if (advisories.length === 0) {
        advisories.push({
            type: 'info',
            icon: 'ℹ️',
            message: 'Weather conditions are normal. Proceed with regular farming activities.'
        });
    }
    

    return advisories;
}

// ===========================================
// STEP 8: HELPER FUNCTION - PROCESS FORECAST DATA
// ===========================================


function processForecastData(forecastList) {
    
    const processedForecast = [];
    for (let i = 0; i < Math.min(forecastList.length, 10); i++) {
        const item = forecastList[i];
        const forecastItem = {
            dateTime: item.dt_txt,
            temperature: Math.round(item.main.temp * 10) / 10,
            humidity: item.main.humidity,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            windSpeed: Math.round(item.wind.speed * 3.6 * 10) / 10,
            rainProbability: Math.round((item.pop || 0) * 100)
        };
        
        // Add this item to our processed array
        processedForecast.push(forecastItem);
    }
    
    // Return the processed forecast array
    return processedForecast;
}

// ===========================================
// STEP 9: MAIN API ROUTE - GET WEATHER DATA
// ===========================================

app.get('/api/weather', async (req, res) => {
    try {
        // ----------------------------------------
        // STEP 9.1: Get location from query parameter
        // ----------------------------------------
        const location = req.query.location;
        
        if (!location) {
            // Send error response if no location
            return res.status(400).json({
                success: false,
                error: 'Please provide a location. Example: /api/weather?location=Mumbai'
            });
        }
        
        // ----------------------------------------
        // STEP 9.2: Get API key from environment variables
        // ----------------------------------------
        const apiKey = process.env.OPENWEATHER_API_KEY;
        
        // Check if API key exists
        if (!apiKey || apiKey === 'your_api_key_here') {
            return res.status(500).json({
                success: false,
                error: 'OpenWeatherMap API key is not configured. Please add it to .env file.'
            });
        }
        
        // ----------------------------------------
        // STEP 9.3: Fetch 5-day forecast from OpenWeatherMap
        // ----------------------------------------
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
        const forecastResponse = await axios.get(forecastUrl);
        const forecastData = forecastResponse.data;
        
        // ----------------------------------------
        // STEP 9.4: Extract current weather (first item in forecast)
        // ----------------------------------------
        const currentWeather = forecastData.list[0];
        // ----------------------------------------
        // STEP 9.5: Prepare current weather data
        // ----------------------------------------
        const weatherData = {
            // City name and country
            cityName: forecastData.city.name,
            country: forecastData.city.country,
            
            // Temperature in Celsius
            temperature: Math.round(currentWeather.main.temp * 10) / 10,
            
            // "Feels like" temperature
            feelsLike: Math.round(currentWeather.main.feels_like * 10) / 10,
            
            // Humidity percentage
            humidity: currentWeather.main.humidity,
            
            // Weather description
            description: currentWeather.weather[0].description,
            
            // Weather icon code
            icon: currentWeather.weather[0].icon,
            
            // Wind speed in km/h (convert from m/s)
            windSpeed: Math.round(currentWeather.wind.speed * 3.6 * 10) / 10,
            
            // Rain probability (percentage)
            rainProbability: Math.round((currentWeather.pop || 0) * 100),
            
            // Atmospheric pressure
            pressure: currentWeather.main.pressure
        };
        
        // ----------------------------------------
        // STEP 9.6: Process 5-day forecast
        // ----------------------------------------
        const forecast = processForecastData(forecastData.list);
        
        // ----------------------------------------
        // STEP 9.7: Generate farmer advisories
        // ----------------------------------------
        const advisories = generateAdvisories(weatherData);
        
        // ----------------------------------------
        // STEP 9.8: Save search to database
        // ----------------------------------------
        try {
            // Create a new search history document
            const newSearch = new SearchHistory({
                locationName: weatherData.cityName
            });
            
            // Save it to the database
            await newSearch.save();
            
            console.log(`📍 Saved search: ${weatherData.cityName}`);
        } catch (dbError) {
            // If database save fails, just log it (don't stop the response)
            console.log('Could not save to database:', dbError.message);
        }
        
        // ----------------------------------------
        // STEP 9.9: Send response to frontend
        // ----------------------------------------
        res.json({
            success: true,
            currentWeather: weatherData,
            forecast: forecast,
            advisories: advisories
        });
        
    } catch (error) {
        // ----------------------------------------
        // ERROR HANDLING
        // ----------------------------------------
        console.error('Error fetching weather:', error.message);
        
        // Check if it's a "city not found" error
        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                success: false,
                error: 'City not found. Please check the spelling and try again.'
            });
        }
        
        // For other errors
        res.status(500).json({
            success: false,
            error: 'Failed to fetch weather data. Please try again later.'
        });
    }
});

// ===========================================
// STEP 10: API ROUTE - GET RECENT SEARCHES
// ===========================================


app.get('/api/recent-searches', async (req, res) => {
    try {
        const recentSearches = await SearchHistory
            .find({})                   
            .sort({ searchDate: -1 })   
            .limit(5);                  
        
        // Extract just the location names into an array
        const locations = recentSearches.map(search => search.locationName);
        
        // Send the response
        res.json({
            success: true,
            recentSearches: locations
        });
        
    } catch (error) {
        console.error('Error fetching recent searches:', error.message);
        
        res.status(500).json({
            success: false,
            error: 'Could not fetch recent searches.',
            recentSearches: []
        });
    }
});

// ===========================================
// STEP 11: API ROUTE - CLEAR SEARCH HISTORY
// ===========================================


app.delete('/api/recent-searches', async (req, res) => {
    try {

        await SearchHistory.deleteMany({});
        
        res.json({
            success: true,
            message: 'Search history cleared successfully.'
        });
        
    } catch (error) {
        console.error('Error clearing search history:', error.message);
        
        res.status(500).json({
            success: false,
            error: 'Could not clear search history.'
        });
    }
});

// ===========================================
// STEP 12: BASIC ROUTES FOR TESTING
// ===========================================


app.get('/', (req, res) => {
    res.json({
        message: 'Farmer Weather Advisory API is running!',
        endpoints: {
            weather: 'GET /api/weather?location=cityname',
            recentSearches: 'GET /api/recent-searches',
            clearHistory: 'DELETE /api/recent-searches'
        }
    });
});

// ===========================================
// STEP 13: START THE SERVER
// ===========================================


app.listen(PORT, () => {
    console.log('===========================================');
    console.log('🌾 Farmer Weather Advisory API');
    console.log('===========================================');
    console.log(`✅ Server is running on: http://localhost:${PORT}`);
    console.log(`📡 Weather API: http://localhost:${PORT}/api/weather?location=Mumbai`);
    console.log(`📋 Recent searches: http://localhost:${PORT}/api/recent-searches`);
    console.log('===========================================');
});
