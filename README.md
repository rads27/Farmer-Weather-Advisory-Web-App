# 🌾 Farmer Weather Advisory Tool

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

## 💡 Advisory Logic Explained (Simple Words)

The backend checks weather conditions and gives farming advice using simple if/else statements:

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

### Advisory 3: Wind Warning
```javascript
if (windSpeed > 15) {
    // Wind is stronger than 15 km/h
    // Advice: Don't spray pesticides
}
```
**Why?** Strong wind carries pesticide spray to unwanted areas (called "drift").

### Advisory 4: Humidity Warning
```javascript
if (humidity > 80) {
    // Humidity is above 80%
    // Advice: Watch for fungal diseases
}
```
**Why?** Fungi grow quickly in moist conditions and can damage crops.

### Advisory 5: Good Spraying Conditions
```javascript
if (windSpeed < 10 && rainProbability < 30) {
    // Low wind AND low rain chance
    // Advice: Good time to spray
}
```
**Why?** Calm conditions ensure pesticides stay where you spray them.

---

## 🎤 How to Explain This Project in Interviews

### Opening Statement:
> "I built a full-stack weather application for farmers using the MERN stack. It provides weather forecasts and generates smart farming advisories based on weather conditions."

### Technical Stack Explanation:
> "For the frontend, I used React.js with functional components and hooks like useState and useEffect. For the backend, I used Node.js with Express.js to create a REST API. I optionally integrated MongoDB to store search history."

### Key Features to Highlight:

1. **API Integration**
   > "The backend fetches weather data from OpenWeatherMap API and processes it before sending to the frontend. This keeps the API key secure on the server."

2. **Advisory System**
   > "I implemented a rule-based advisory system using simple if/else logic. For example, if rain probability is above 60%, it advises farmers to avoid irrigation."

3. **State Management**
   > "I used React's useState hook to manage application state - storing weather data, forecast, advisories, and loading states."

4. **Frontend-Backend Communication**
   > "The frontend makes HTTP requests to the backend using the fetch API. The backend responds with JSON data that React uses to update the UI."

5. **Database Integration**
   > "I used MongoDB with Mongoose to save search history. The schema is simple - just location name and search date."

### Common Interview Questions:

**Q: Why did you use a backend? Why not call the API directly from React?**
> "Three reasons: First, to keep the API key secure - exposing it in frontend code is a security risk. Second, to process and format the data before sending to frontend. Third, to generate advisories on the server so the logic is centralized."

**Q: Explain the useEffect hook.**
> "useEffect runs code after the component renders. I used it to fetch recent searches when the page first loads. The empty dependency array means it runs only once, like componentDidMount."

**Q: What is CORS and why did you need it?**
> "CORS stands for Cross-Origin Resource Sharing. Browsers block requests from one origin to another for security. Since React runs on port 3000 and Express on port 5000, we need CORS to allow this communication."

**Q: How does the advisory system work?**
> "It's a simple rule-based system. The generateAdvisories function checks weather values against thresholds. For example, temperature > 35 triggers a heat advisory. All advisories are text strings that get displayed in the UI."

---

## 📝 About PDF Download Feature

We decided to skip the PDF download feature because:
1. It requires external libraries like `jspdf` or `html2canvas`
2. These add complexity that's hard to explain in interviews
3. For a beginner project, it's better to focus on core MERN concepts
4. If needed later, it can be added using `jspdf`:
   ```javascript
   import jsPDF from 'jspdf';
   const doc = new jsPDF();
   doc.text("Advisory: ...", 10, 10);
   doc.save("advisories.pdf");
   ```

---

## 🐛 Troubleshooting Common Issues

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
- **Simple Charts**: Pure CSS bars instead of complex chart libraries
- **Clear Typography**: Roboto font for readability
- **Mobile Responsive**: Works on phones and tablets

---

## 📚 Technologies Used

| Technology | Purpose |
|------------|---------|
| React 18 | Frontend UI framework |
| Node.js | JavaScript runtime for backend |
| Express.js | Backend web framework |
| MongoDB | Database (optional) |
| Mongoose | MongoDB object modeling |
| Axios | HTTP client for API calls |
| CSS3 | Styling (no frameworks) |

---

## ✅ Checklist for Viva/Interview

- [ ] I can explain what MERN stands for
- [ ] I can draw the frontend-backend communication flow
- [ ] I can explain useState and useEffect hooks
- [ ] I can explain the advisory logic
- [ ] I can explain why we use a backend instead of direct API calls
- [ ] I can explain the MongoDB schema
- [ ] I can explain what CORS is
- [ ] I can demonstrate the app working
- [ ] I can make a small code change if asked

---

## 🙏 Credits

- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- Font: [Google Fonts - Roboto](https://fonts.google.com/specimen/Roboto)

---
