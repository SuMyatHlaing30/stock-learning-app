// src/components/Portfolio/PortfolioHoldings.js
import React from 'react';

const PortfolioHoldings = ({ holdings, onRemoveStock }) => {
  if (!holdings || holdings.length === 0) {
    return null;
  }
  
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
    <div className="portfolio-holdings">
      <h3>Your Holdings</h3>
      
      <div className="holdings-table-container">
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Purchase Price</th>
              <th>Current Price</th>
              <th>Total Cost</th>
              <th>Current Value</th>
              <th>Gain/Loss</th>
              <th>%</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((stock) => (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
                <td>{formatCurrency(stock.purchasePrice)}</td>
                <td>{formatCurrency(stock.currentPrice)}</td>
                <td>{formatCurrency(stock.totalCost)}</td>
                <td>{formatCurrency(stock.currentValue)}</td>
                <td className={stock.gain >= 0 ? 'positive' : 'negative'}>
                  {formatCurrency(stock.gain)}
                </td>
                <td className={stock.percentageGain >= 0 ? 'positive' : 'negative'}>
                  {stock.percentageGain >= 0 ? '+' : ''}{formatPercentage(stock.percentageGain)}
                </td>
                <td>
                  <button 
                    className="remove-button"
                    onClick={() => onRemoveStock(stock.symbol)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioHoldings;
