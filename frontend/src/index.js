// ===========================================
// REACT APP ENTRY POINT - index.js
// ===========================================
// This is the first JavaScript file that runs when React app starts
// It connects our React components to the HTML page

// Import React library - needed for creating React components
import React from 'react';

// Import ReactDOM - needed for rendering React to the webpage
import ReactDOM from 'react-dom/client';

// Import our main App component
import App from './App';

// Import our CSS styles
import './App.css';

// ===========================================
// RENDER THE APP
// ===========================================

// Find the 'root' div in index.html
// This is where our entire React app will be displayed
const rootElement = document.getElementById('root');

// Create a React root for rendering
const root = ReactDOM.createRoot(rootElement);

// Render the App component inside the root
// <React.StrictMode> helps find potential problems in the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
