// src/components/Portfolio/PortfolioSummary.js
import React from 'react';

const PortfolioSummary = ({ performanceData }) => {
  if (!performanceData) {
    return (
      <div className="portfolio-summary-loading">
        <p>Loading portfolio data...</p>
      </div>
    );
  }

  const { totalInvested, currentValue, totalGain, percentageGain } = performanceData;
  
  // Format for currency display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  // Format for percentage display
  const formatPercentage = (percent) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(percent / 100);
  };
  
  return (
    <div className="portfolio-summary">
      <div className="summary-card">
        <div className="summary-label">Total Invested</div>
        <div className="summary-value">{formatCurrency(totalInvested)}</div>
      </div>
      
      <div className="summary-card">
        <div className="summary-label">Current Value</div>
        <div className="summary-value">{formatCurrency(currentValue)}</div>
      </div>
      
      <div className="summary-card">
        <div className="summary-label">Total Gain/Loss</div>
        <div className={`summary-value ${totalGain >= 0 ? 'positive' : 'negative'}`}>
          {formatCurrency(totalGain)}
        </div>
      </div>
      
      <div className="summary-card">
        <div className="summary-label">Percentage Gain/Loss</div>
        <div className={`summary-value ${percentageGain >= 0 ? 'positive' : 'negative'}`}>
          {percentageGain >= 0 ? '+' : ''}{formatPercentage(percentageGain)}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
