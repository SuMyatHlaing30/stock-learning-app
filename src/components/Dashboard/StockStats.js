// src/components/Dashboard/StockStats.js
import React from 'react';

const StockStats = ({ stock }) => {
  if (!stock) return null;
  
  // Format large numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  // Format percentage
  const formatPercentage = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return `${value.toFixed(2)}%`;
  };
  
  return (
    <div className="stock-stats">
      <h3>Key Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">Market Cap</div>
          <div className="stat-value">
            {stock.marketCap 
              ? `${(stock.marketCap / 1000000000).toFixed(2)}B` 
              : 'N/A'}
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">P/E Ratio</div>
          <div className="stat-value">
            {stock.trailingPE ? stock.trailingPE.toFixed(2) : 'N/A'}
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Dividend Yield</div>
          <div className="stat-value">
            {stock.dividendYield 
              ? formatPercentage(stock.dividendYield * 100) 
              : 'N/A'}
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">52 Week High</div>
          <div className="stat-value">
            {stock.fiftyTwoWeekHigh 
              ? formatCurrency(stock.fiftyTwoWeekHigh) 
              : 'N/A'}
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">52 Week Low</div>
          <div className="stat-value">
            {stock.fiftyTwoWeekLow 
              ? formatCurrency(stock.fiftyTwoWeekLow) 
              : 'N/A'}
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Volume</div>
          <div className="stat-value">
            {stock.regularMarketVolume 
              ? formatNumber(stock.regularMarketVolume) 
              : 'N/A'}
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Avg. Volume</div>
          <div className="stat-value">
            {stock.averageDailyVolume3Month 
              ? formatNumber(stock.averageDailyVolume3Month) 
              : 'N/A'}
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Day Range</div>
          <div className="stat-value">
            {stock.regularMarketDayLow && stock.regularMarketDayHigh 
              ? `${formatCurrency(stock.regularMarketDayLow)} - ${formatCurrency(stock.regularMarketDayHigh)}` 
              : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockStats;
