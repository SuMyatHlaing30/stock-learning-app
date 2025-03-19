// src/components/Portfolio/AddStockForm.js
import React, { useState } from 'react';
import { searchStocks, fetchStockQuote } from '../../api/stockApi';

const AddStockForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    symbol: '',
    quantity: 1,
    price: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value, 10) || '' : value
    }));
  };
  
  const handleSearch = async () => {
    if (!searchQuery) return;
    
    setSearching(true);
    try {
      const results = await searchStocks(searchQuery);
      setSearchResults(results.slice(0, 5)); // Limit to first 5 results
    } catch (error) {
      console.error('Error searching stocks:', error);
    } finally {
      setSearching(false);
    }
  };
  
  const handleSelectStock = async (stock) => {
    setFormData(prev => ({
      ...prev,
      symbol: stock.symbol
    }));
    
    setSearchResults([]);
    setSearchQuery('');
    
    // Get current price
    try {
      const quoteData = await fetchStockQuote(stock.symbol);
      if (quoteData && quoteData.body && quoteData.body[0]) {
        const price = quoteData.body[0].regularMarketPrice;
        setCurrentPrice(price);
        setFormData(prev => ({
          ...prev,
          price: price
        }));
      }
    } catch (error) {
      console.error('Error fetching current price:', error);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <div className="add-stock-form">
      <div className="stock-search-container">
        <label>Find a Stock:</label>
        <div className="search-input-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter company name or symbol"
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={searching}
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result) => (
              <div 
                key={result.symbol} 
                className="search-result-item"
                onClick={() => handleSelectStock(result)}
              >
                <span className="result-symbol">{result.symbol}</span>
                <span className="result-name">{result.shortName}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="symbol">Stock Symbol:</label>
          <input
            type="text"
            id="symbol"
            name="symbol"
            value={formData.symbol}
            onChange={handleInputChange}
            required
            readOnly={currentPrice !== null}
          />
        </div>
        
        {currentPrice !== null && (
          <div className="current-price-info">
            Current Price: <strong>${currentPrice.toFixed(2)}</strong>
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="quantity">Number of Shares:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Purchase Price Per Share:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0.01"
            step="0.01"
            placeholder="Enter purchase price"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Purchase Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        {formData.symbol && formData.quantity && formData.price && (
          <div className="total-cost">
            Total Cost: <strong>${(formData.quantity * formData.price).toFixed(2)}</strong>
          </div>
        )}
        
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Add to Portfolio
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStockForm;
