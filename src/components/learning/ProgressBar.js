import React from 'react';

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-bar-container">
      <div 
        className="progress-bar-fill" 
        style={{ width: `${percentage}%` }}
      >
        <span className="progress-text">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;