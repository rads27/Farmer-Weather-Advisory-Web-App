// ===========================================
// ADVISORY BOX COMPONENT - AdvisoryBox.js
// ===========================================

import React from 'react';

// =========================================
// COMPONENT FUNCTION
// =========================================


function AdvisoryBox({ advisories }) {

  if (!advisories || advisories.length === 0) {
    return null;
  }

  // =========================================
  // RENDER THE UI
  // =========================================
  return (
    <div className="advisory-box">
      {/* Section heading */}
      <h2 className="section-title">💡 Farming Advisories</h2>
      
      {/* Advisory notice header */}
      <div className="advisory-header">
        <span className="advisory-header-icon">📋</span>
        <span className="advisory-header-text">
          Today's Farming Recommendations
        </span>
      </div>
      
      {/* List of advisories */}
      <ul className="advisory-list">
        {/* Loop through each advisory and display it */}
        {advisories.map((advisory, index) => (
          <li 
            key={index} 
            className={`advisory-item advisory-${advisory.type}`}
          >
            {/* Advisory icon */}
            <span className="advisory-icon">{advisory.icon}</span>
            
            {/* Advisory message */}
            <span className="advisory-message">{advisory.message}</span>
          </li>
        ))}
      </ul>
      
      {/* Footer note */}
      <div className="advisory-footer">
        <p>
          ℹ️ These advisories are based on current weather conditions. 
          Always consider your specific crop and local conditions.
        </p>
      </div>
    </div>
  );
}


export default AdvisoryBox;
