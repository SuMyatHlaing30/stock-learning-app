// src/components/Portfolio/PortfolioTracker.js
import React, { useState, useEffect } from 'react';
import { 
  getPortfolio, 
  addToPortfolio, 
  removeFromPortfolio,
  calculatePerformance 
} from '../../api/portfolioApi';
import { fetchStockQuote } from '../../api/stockApi';
import PortfolioSummary from './PortfolioSummary';
import PortfolioHoldings from './PortfolioHoldings';
import AddStockForm from './AddStockForm';

const PortfolioTracker = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingStock, setAddingStock] = useState(false);
  
  // Fetch portfolio data
  const loadPortfolio = async () => {
    setLoading(true);
    try {
      const portfolioData = getPortfolio();
      setPortfolio(portfolioData);
      
      // Calculate performance
      const fetchCurrentPrices = async (symbols) => {
        const priceMap = {};
        
        // Fetch current prices for each symbol
        await Promise.all(
          symbols.map(async (symbol) => {
            try {
              const quoteData = await fetchStockQuote(symbol);
              if (quoteData && quoteData.body && quoteData.body[0]) {
                priceMap[symbol] = quoteData.body[0].regularMarketPrice;
              }
            } catch (error) {
              console.error(`Error fetching price for ${symbol}:`, error);
              priceMap[symbol] = 0; // Default if we can't get the price
            }
          })
        );
        
        return priceMap;
      };
      
      const performance = await calculatePerformance(fetchCurrentPrices);
      setPerformanceData(performance);
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Load portfolio on mount
  useEffect(() => {
    loadPortfolio();
    
    // Set up interval to refresh prices (every 5 minutes)
    const intervalId = setInterval(() => {
      loadPortfolio();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Handle adding a stock to portfolio
  const handleAddStock = async (stockData) => {
    try {
      // Get current stock info
      const quoteData = await fetchStockQuote(stockData.symbol);
      
      if (!quoteData || !quoteData.body || !quoteData.body[0]) {
        throw new Error('Could not get current stock price');
      }
      
      const currentPrice = quoteData.body[0].regularMarketPrice;
      const stockName = quoteData.body[0].shortName || stockData.symbol;
      
      // Add to portfolio
      const updatedPortfolio = addToPortfolio({
        symbol: stockData.symbol,
        name: stockName,
        quantity: stockData.quantity,
        price: stockData.price || currentPrice,
        date: stockData.date || new Date().toISOString()
      });
      
      setPortfolio(updatedPortfolio);
      setAddingStock(false);
      
      // Refresh portfolio data
      loadPortfolio();
    } catch (error) {
      console.error('Error adding stock to portfolio:', error);
      alert(`Error adding stock: ${error.message}`);
    }
  };
  
  // Handle removing a stock
  const handleRemoveStock = (symbol) => {
    if (window.confirm(`Are you sure you want to remove ${symbol} from your portfolio?`)) {
      const updatedPortfolio = removeFromPortfolio(symbol);
      setPortfolio(updatedPortfolio);
      loadPortfolio();
    }
  };
  
  return (
    <div className="portfolio-tracker">
      <h1>Portfolio Tracker</h1>
      
      {loading ? (
        <div className="loading">Loading portfolio data...</div>
      ) : (
        <>
          <PortfolioSummary performanceData={performanceData} />
          
          <div className="portfolio-actions">
            <button 
              className="add-stock-button"
              onClick={() => setAddingStock(true)}
            >
              Add Stock to Portfolio
            </button>
          </div>
          
          {addingStock && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button className="close-modal" onClick={() => setAddingStock(false)}>×</button>
                <h3>Add Stock to Portfolio</h3>
                <AddStockForm onSubmit={handleAddStock} onCancel={() => setAddingStock(false)} />
              </div>
            </div>
          )}
          
          <PortfolioHoldings 
            holdings={performanceData?.holdings || []} 
            onRemoveStock={handleRemoveStock}
          />
          
          {portfolio.length === 0 && !loading && (
            <div className="empty-portfolio">
              <h3>Your portfolio is empty</h3>
              <p>Start tracking your investments by adding stocks to your portfolio.</p>
              <button 
                className="add-stock-button-large"
                onClick={() => setAddingStock(true)}
              >
                Add Your First Stock
              </button>
            </div>
          )}
          
          <div className="portfolio-learning">
            <h3>Investment Tips for Beginners</h3>
            <ul className="learning-tips">
              <li><strong>Diversify:</strong> Don't put all your money in one stock or sector.</li>
              <li><strong>Think Long Term:</strong> Stock market produces better returns over longer periods.</li>
              <li><strong>Start Small:</strong> Begin with a small amount you can afford to lose.</li>
              <li><strong>Monitor, Don't Obsess:</strong> Check your portfolio weekly, not hourly.</li>
              <li><strong>Reinvest Dividends:</strong> Consider reinvesting dividends to grow your portfolio faster.</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default PortfolioTracker;
