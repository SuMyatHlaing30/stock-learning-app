// src/components/Dashboard/StockSearch.js
import React, { useState } from 'react';
import { searchStocks } from '../../api/stockApi';

const StockSearch = ({ onSelectStock }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setError('');
    
    try {
      const results = await searchStocks(searchQuery);
      setSearchResults(results.slice(0, 5)); // Show top 5 results
    } catch (error) {
      console.error('Error searching for stocks:', error);
      setError('Failed to search for stocks. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleSelectStock = (symbol) => {
    onSelectStock(symbol);
    setSearchResults([]);
    setSearchQuery('');
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="stock-search">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a stock symbol or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="search-button"
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {error && <div className="search-error">{error}</div>}
      
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result) => (
            <div
              key={result.symbol}
              className="search-result-item"
              onClick={() => handleSelectStock(result.symbol)}
            >
              <div className="result-symbol">{result.symbol}</div>
              <div className="result-name">{result.shortName || result.longName}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockSearch;
