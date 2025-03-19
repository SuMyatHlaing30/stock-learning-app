// src/components/StockScreener/StockScreener.js
import React, { useState } from 'react';
import { searchStocks, fetchStockQuote } from '../../api/stockApi';

const StockScreener = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 1000,
    marketCapMin: 0,
    marketCapMax: 1000000000000,
    dividendYieldMin: 0,
    sector: 'any',
  });
  
  // Predefined screens for beginners
  const predefinedScreens = [
    {
      name: "Beginner-Friendly Stocks",
      description: "Large, stable companies with lower volatility",
      filters: {
        priceMin: 20,
        priceMax: 500,
        marketCapMin: 10000000000,
        marketCapMax: 1000000000000,
        dividendYieldMin: 1,
        sector: 'any',
      }
    },
    {
      name: "Dividend Income",
      description: "Stocks with higher dividend yields",
      filters: {
        priceMin: 0,
        priceMax: 1000,
        marketCapMin: 1000000000,
        marketCapMax: 1000000000000,
        dividendYieldMin: 3,
        sector: 'any',
      }
    },
    {
      name: "Growth Potential",
      description: "Smaller companies with growth potential",
      filters: {
        priceMin: 0,
        priceMax: 100,
        marketCapMin: 500000000,
        marketCapMax: 10000000000,
        dividendYieldMin: 0,
        sector: 'Technology',
      }
    }
  ];
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: name.includes('Min') || name.includes('Max') ? parseFloat(value) : value
    }));
  };
  
  const applyPredefinedScreen = (screen) => {
    setFilters(screen.filters);
    runScreener(screen.filters);
  };
  
  const runScreener = async (filtersToUse = filters) => {
    setLoading(true);
    
    try {
      // For a real app, you would use a proper screener API
      // This is a simplified version using search and then filtering
      // Get some stock data - we'll use a market index as a starting point
      const searchResponse = await searchStocks('S&P500 companies');
      
      if (!searchResponse || !searchResponse.length) {
        throw new Error('No stocks found to screen');
      }
      
      // Get first 20 symbols to work with (in a real app, you would get more)
      const symbols = searchResponse.slice(0, 20).map(item => item.symbol);
      
      // Fetch details for each stock to apply filters
      const stockDetails = await Promise.all(
        symbols.map(symbol => fetchStockQuote(symbol))
      );
      
      // Apply filters
      const filteredResults = stockDetails
        .map(response => response.body[0])
        .filter(stock => {
          if (!stock) return false;
          
          const price = stock.regularMarketPrice;
          const marketCap = stock.marketCap || 0;
          const dividendYield = (stock.dividendYield || 0) * 100; // Convert to percentage
          const stockSector = stock.sector || '';
          
          return (
            price >= filtersToUse.priceMin &&
            price <= filtersToUse.priceMax &&
            marketCap >= filtersToUse.marketCapMin &&
            marketCap <= filtersToUse.marketCapMax &&
            dividendYield >= filtersToUse.dividendYieldMin &&
            (filtersToUse.sector === 'any' || stockSector.includes(filtersToUse.sector))
          );
        });
      
      setResults(filteredResults);
    } catch (error) {
      console.error('Error running stock screener:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="stock-screener">
      <h1>Stock Screener</h1>
      <p className="screener-description">
        Find stocks matching your investment criteria. For beginners, try one of our predefined screens.
      </p>
      
      <div className="predefined-screens">
        <h3>Beginner Screens</h3>
        <div className="screen-buttons">
          {predefinedScreens.map((screen, index) => (
            <button 
              key={index} 
              className="screen-button"
              onClick={() => applyPredefinedScreen(screen)}
            >
              <span className="screen-name">{screen.name}</span>
              <span className="screen-description">{screen.description}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="screener-filters">
        <h3>Custom Filters</h3>
        <div className="filter-grid">
          <div className="filter-group">
            <label>Price Range:</label>
            <div className="range-inputs">
              <input
                type="number"
                name="priceMin"
                placeholder="Min"
                value={filters.priceMin}
                onChange={handleFilterChange}
              />
              <span>to</span>
              <input
                type="number"
                name="priceMax"
                placeholder="Max"
                value={filters.priceMax}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          
          <div className="filter-group">
            <label>Market Cap (in billions):</label>
            <div className="range-inputs">
              <input
                type="number"
                name="marketCapMin"
                placeholder="Min"
                value={filters.marketCapMin / 1000000000}
                onChange={(e) => handleFilterChange({
                  target: {
                    name: 'marketCapMin',
                    value: parseFloat(e.target.value) * 1000000000
                  }
                })}
              />
              <span>to</span>
              <input
                type="number"
                name="marketCapMax"
                placeholder="Max"
                value={filters.marketCapMax / 1000000000}
                onChange={(e) => handleFilterChange({
                  target: {
                    name: 'marketCapMax',
                    value: parseFloat(e.target.value) * 1000000000
                  }
                })}
              />
            </div>
          </div>
          
          <div className="filter-group">
            <label>Minimum Dividend Yield (%):</label>
            <input
              type="number"
              name="dividendYieldMin"
              placeholder="0"
              value={filters.dividendYieldMin}
              onChange={handleFilterChange}
            />
          </div>
          
          <div className="filter-group">
            <label>Sector:</label>
            <select name="sector" value={filters.sector} onChange={handleFilterChange}>
              <option value="any">Any Sector</option>
              <option value="Technology">Technology</option>
              <option value="Financial">Financial</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Consumer">Consumer</option>
              <option value="Energy">Energy</option>
              <option value="Industrial">Industrial</option>
              <option value="Utilities">Utilities</option>
            </select>
          </div>
        </div>
        
        <button className="run-screener-button" onClick={() => runScreener()}>
          Run Screener
        </button>
      </div>
      
      <div className="screener-results">
        <h3>Results {results.length > 0 ? `(${results.length})` : ''}</h3>
        
        {loading ? (
          <div className="loading">Running screener...</div>
        ) : (
          <>
            {results.length === 0 ? (
              <div className="no-results">No stocks match your criteria</div>
            ) : (
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>Market Cap</th>
                    <th>Dividend Yield</th>
                    <th>P/E Ratio</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(stock => (
                    <tr key={stock.symbol}>
                      <td>{stock.symbol}</td>
                      <td>{stock.shortName}</td>
                      <td>${stock.regularMarketPrice.toFixed(2)}</td>
                      <td className={stock.regularMarketChange >= 0 ? 'positive' : 'negative'}>
                        {stock.regularMarketChange >= 0 ? '+' : ''}
                        {stock.regularMarketChange.toFixed(2)} 
                        ({stock.regularMarketChangePercent.toFixed(2)}%)
                      </td>
                      <td>${(stock.marketCap / 1000000000).toFixed(1)}B</td>
                      <td>{stock.dividendYield ? (stock.dividendYield * 100).toFixed(2) : 0}%</td>
                      <td>{stock.trailingPE ? stock.trailingPE.toFixed(2) : 'N/A'}</td>
                      <td>
                        <button className="action-button">Add to Watchlist</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
      
      <div className="screener-education">
        <h3>Understanding Stock Metrics</h3>
        <ul className="metrics-explanation">
          <li><strong>Market Cap:</strong> Total value of all outstanding shares. Larger companies (>$10B) are typically more stable.</li>
          <li><strong>Dividend Yield:</strong> Annual dividend payment as percentage of stock price. Higher yield = more income.</li>
          <li><strong>P/E Ratio:</strong> Price relative to earnings. Lower can indicate better value (but varies by industry).</li>
          <li><strong>Price Change:</strong> Recent price movement. Look for stability or positive momentum based on your strategy.</li>
        </ul>
      </div>
    </div>
  );
};

export default StockScreener;
