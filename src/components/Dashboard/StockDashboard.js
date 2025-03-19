// src/components/Dashboard/StockDashboard.js
import React, { useState, useEffect } from 'react';
import { fetchStockQuote, fetchHistoricalData } from '../../api/stockApi';
import StockChart from '../common/StockChart';
import StockStats from './StockStats';
import StockSearch from './StockSearch';

const StockDashboard = () => {
  const [currentStock, setCurrentStock] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Default stocks to display
  const defaultStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];
  const [watchlist, setWatchlist] = useState(defaultStocks);
  
  const handleStockSelect = async (symbol) => {
    if (!symbol) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Fetch stock data
      const quoteData = await fetchStockQuote(symbol);
      
      if (!quoteData) {
        throw new Error('No data found for this stock');
      }
      
      // Fetch historical data for chart
      const histData = await fetchHistoricalData(symbol, '1d', '1y');
      
      // Format historical data for chart
      const formattedHistData = histData.body.map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        close: item.close,
        open: item.open,
        high: item.high,
        low: item.low,
        volume: item.volume
      }));
      
      setCurrentStock(quoteData.body[0]);
      setHistoricalData(formattedHistData);
      
      // Add to watchlist if not already there
      if (!watchlist.includes(symbol)) {
        setWatchlist(prev => [...prev, symbol]);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError('Could not load stock data. Please try another symbol.');
    } finally {
      setLoading(false);
    }
  };
  
  // Load first stock on mount
  useEffect(() => {
    if (watchlist.length > 0) {
      handleStockSelect(watchlist[0]);
    }
  }, []);
  
  return (
    <div className="stock-dashboard">
      <div className="dashboard-header">
        <h1>Stock Dashboard</h1>
        <StockSearch onSelectStock={handleStockSelect} />
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {currentStock && (
            <div className="stock-overview">
              <div className="stock-header">
                <h2>{currentStock.shortName} ({currentStock.symbol})</h2>
                <div className="stock-price">
                  <span className="current-price">${currentStock.regularMarketPrice.toFixed(2)}</span>
                  <span className={`price-change ${currentStock.regularMarketChange >= 0 ? 'positive' : 'negative'}`}>
                    {currentStock.regularMarketChange >= 0 ? '+' : ''}
                    {currentStock.regularMarketChange.toFixed(2)} 
                    ({currentStock.regularMarketChangePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
              
              <div className="stock-content">
                <div className="chart-container">
                  <StockChart data={historicalData} />
                </div>
                <StockStats stock={currentStock} />
              </div>
            </div>
          )}
          
          <div className="watchlist">
            <h3>Watchlist</h3>
            <div className="watchlist-items">
              {watchlist.map(symbol => (
                <button 
                  key={symbol}
                  onClick={() => handleStockSelect(symbol)}
                  className={currentStock && currentStock.symbol === symbol ? 'active' : ''}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StockDashboard;
