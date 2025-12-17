# 🌾 GoodWeather App : A Farmer Weather Advisory Tool

A complete MERN stack application that provides weather forecasts and farming advisories for farmers.

![Tech Stack](https://img.shields.io/badge/React-18.2-blue)
![Tech Stack](https://img.shields.io/badge/Node.js-Express-green)
![Tech Stack](https://img.shields.io/badge/MongoDB-Optional-brightgreen)

---

## 📁 Complete Folder Structure

```
WeatherappMERN/
│
├── backend/                    # Backend (Node.js + Express)
│   ├── server.js              # Main server file with all routes
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables (API keys)
│
├── frontend/                   # Frontend (React)
│   ├── public/
│   │   └── index.html         # HTML template
│   │
│   ├── src/
│   │   ├── index.js           # React entry point
│   │   ├── App.js             # Main React component
│   │   ├── App.css            # All styles
│   │   │
│   │   └── components/        # Reusable UI components
│   │       ├── SearchBar.js       # Search input and button
│   │       ├── CurrentWeather.js  # Current weather display
│   │       ├── Forecast.js        # 5-day forecast cards
│   │       ├── AdvisoryBox.js     # Farming advisories
│   │       ├── RecentSearches.js  # Search history
│   │       └── TemperatureChart.js # Temperature/rain charts
│   │
│   └── package.json           # Frontend dependencies
│
├── .gitignore                 # Files to ignore in Git
└── README.md                  # This file!
```

---

## 🚀 Step-by-Step Setup Instructions

### Prerequisites (What you need to install first)

1. **Node.js** - Download and install from [nodejs.org](https://nodejs.org/)
   - Choose the LTS (Long Term Support) version
   - This includes npm (Node Package Manager)

2. **MongoDB** (Optional but recommended)
   - Option A: Local MongoDB - [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Option B: MongoDB Atlas (Cloud) - [mongodb.com/atlas](https://www.mongodb.com/atlas) (Free tier available)

3. **OpenWeatherMap API Key** (Required)
   - Go to [openweathermap.org/api](https://openweathermap.org/api)
   - Sign up for a free account
   - Go to "API Keys" section
   - Copy your API key

---

### Step 1: Clone or Create the Project

If you have the code, navigate to your project folder:
```bash
cd d:\Prjects\WeatherappMERN
```

---

### Step 2: Setup Backend

1. **Open terminal and navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This installs: express, cors, dotenv, axios, mongoose

3. **Configure environment variables:**
   - Open the `.env` file in the backend folder
   - Replace `your_api_key_here` with your actual OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=abc123your_actual_key_here
   MONGODB_URI=mongodb://localhost:27017/farmerweather
   PORT=5000
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```
   You should see:
   ```
   ✅ Server is running on: http://localhost:5000
   ```

---

### Step 3: Setup Frontend

1. **Open a NEW terminal and navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   This will open `http://localhost:3000` in your browser.

---

### Step 4: Test the Application

1. Enter a city name (e.g., "Mumbai", "Delhi", "New York")
2. Click "Get Weather"
3. You should see:
   - Current weather data
   - Farming advisories
   - Temperature chart
   - 5-day forecast

---

## 🔄 How Frontend-Backend Communication Works

### Simple Explanation:

```
   FRONTEND (React)                    BACKEND (Express)              EXTERNAL API
   localhost:3000                      localhost:5000                OpenWeatherMap
   
   [User types "Mumbai"]
          |
          v
   [Clicks Search Button]
          |
          v
   fetch('/api/weather?location=Mumbai') -----> Receives request
                                                      |
                                                      v
                                               Calls OpenWeatherMap API
                                                      |
                                                      v
                                               Processes data
                                               Generates advisories
                                               Saves to MongoDB
                                                      |
                                                      v
   Receives JSON response <---------------------- Sends JSON response
          |
          v
   [Updates UI with weather data]
```

### Detailed Steps:

1. **User Action**: User types "Mumbai" and clicks search
2. **Frontend Request**: React uses `fetch()` to send GET request to `http://localhost:5000/api/weather?location=Mumbai`
3. **Backend Receives**: Express server receives the request at the `/api/weather` route
4. **External API Call**: Backend uses `axios` to fetch data from OpenWeatherMap
5. **Data Processing**: Backend processes the raw data and generates advisories
6. **Database Save**: Backend saves the search to MongoDB (if connected)
7. **Response Sent**: Backend sends clean JSON back to frontend
8. **UI Update**: React updates the state, which automatically re-renders the UI

---

## Advisory Logic:

The backend checks weather conditions and gives farming advice using simple rule-based logic:
### Advisory 1: Rain Warning
```javascript
if (rainProbability > 60) {
    // More than 60% chance of rain
    // Advice: Don't water crops or spray pesticides
}
```
**Why?** If it's likely to rain, irrigation wastes water and pesticides get washed away.

### Advisory 2: Heat Warning
```javascript
if (temperature > 35) {
    // Temperature is above 35°C
    // Advice: Water crops more often
}
```
**Why?** Plants lose water faster in extreme heat and need more irrigation.
and so on...
---

## 📝 About PDF Download Feature

I decided to skip the PDF download feature because:
1. It requires external libraries like `jspdf` or `html2canvas`, which due to some errors aren't running properly in my laptop.
2. If needed later, it can be added using `jspdf`:
   ```javascript
   import jsPDF from 'jspdf';
   const doc = new jsPDF();
   doc.text("Advisory: ...", 10, 10);
   doc.save("advisories.pdf");
   ```

---

## Troubleshooting Common Issues

### "Could not connect to server"
- Make sure backend is running on port 5000
- Check if `npm start` shows no errors in backend terminal

### "API key not configured"
- Open `backend/.env` file
- Make sure OPENWEATHER_API_KEY has your actual key

### "City not found"
- Check spelling of city name
- Try adding country code: "Mumbai,IN" or "London,UK"

### "MongoDB connection failed"
- App still works without MongoDB
- To fix: Install MongoDB locally or use MongoDB Atlas
- Update MONGODB_URI in .env file

---

## 🎨 Design Decisions

- **Color Scheme**: Olive/sage green tones for agriculture theme
- **No Gradients**: Flat, professional design like government portals
- **Simple Charts**: Pure CSS bars
- **Clear Typography**: Roboto font for readability
- **Mobile Responsive**: Works on phones and tablets

---

## 📚 Technologies Used

| Technology | Purpose                        |
|------------|--------------------------------|
| React 18   | Frontend UI framework          |
| Node.js    | JavaScript runtime for backend |
| Express.js | Backend web framework          |
| MongoDB    | Database                       |
| Mongoose   | MongoDB object modeling        |
| Axios      | HTTP client for API calls      |
| CSS3       | Styling                        |

---

## 🙏 Credits

- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- Font: [Google Fonts - Roboto](https://fonts.google.com/specimen/Roboto)

---
