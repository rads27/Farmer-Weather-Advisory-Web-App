// ===========================================
// SEARCH BAR COMPONENT - SearchBar.js
// ===========================================


import React, { useState } from 'react';

// =========================================
// COMPONENT FUNCTION
// =========================================


function SearchBar({ onSearch, isLoading }) {
 
  const [inputValue, setInputValue] = useState('');

  // =========================================
  // HANDLE INPUT CHANGE
  // =========================================
 
  const handleInputChange = (event) => {

    setInputValue(event.target.value);
  };

  // =========================================
  // HANDLE FORM SUBMIT
  // =========================================

  const handleSubmit = (event) => {
   
    event.preventDefault();
    onSearch(inputValue);
  };

  // =========================================
  // RENDER THE UI
  // =========================================
  return (
    <div className="search-bar">
      
      <form onSubmit={handleSubmit} className="search-form">
  
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name (e.g., Mumbai, Delhi, Pune)"
          value={inputValue}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        
        
        <button 
          type="submit" 
          className="search-button"
          disabled={isLoading}
        >
          
          {isLoading ? 'Searching...' : '🔍 Get Weather'}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
