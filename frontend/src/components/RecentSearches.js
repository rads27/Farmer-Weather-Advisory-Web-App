// ===========================================
// RECENT SEARCHES COMPONENT - RecentSearches.js
// ===========================================
import React from 'react';
// =========================================
// COMPONENT FUNCTION
// =========================================
function RecentSearches({ searches, onSearchClick }) {
  if (!searches || searches.length === 0) {
    return null;
  }
  // =========================================
  // HANDLE CLICK ON A LOCATION
  // =========================================
  const handleClick = (location) => {
    onSearchClick(location);
  };

  // =========================================
  // RENDER THE UI
  // =========================================
  return (
    <div className="recent-searches">
      
      <span className="recent-label">Recent Searches:</span>
      
      
      <div className="recent-list">
        {searches.map((location, index) => (
          <button
            key={index}
            className="recent-item"
            onClick={() => handleClick(location)}
          >
            📍 {location}
          </button>
        ))}
      </div>
    </div>
  );
}


export default RecentSearches;
