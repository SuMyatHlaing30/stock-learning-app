// src/pages/AnalysisPage.js
import React from 'react';

const AnalysisPage = () => {
  return (
    <div className="analysis-page">
      <h1>Technical Analysis</h1>
      <p className="coming-soon-message">
        This feature is coming soon. In the future, you'll be able to:
      </p>
      <ul className="feature-list">
        <li>Analyze stock price patterns</li>
        <li>View multiple technical indicators</li>
        <li>Set up custom alerts</li>
        <li>Backtest simple trading strategies</li>
      </ul>
      <div className="placeholder-content">
        <div className="placeholder-section">
          <h3>Moving Averages</h3>
          <div className="placeholder-chart"></div>
        </div>
        <div className="placeholder-section">
          <h3>RSI (Relative Strength Index)</h3>
          <div className="placeholder-chart"></div>
        </div>
        <div className="placeholder-section">
          <h3>MACD (Moving Average Convergence Divergence)</h3>
          <div className="placeholder-chart"></div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
