// src/api/portfolioApi.js

// Get portfolio from local storage
export const getPortfolio = () => {
  const portfolio = localStorage.getItem('portfolio');
  return portfolio ? JSON.parse(portfolio) : [];
};

// Add a stock to portfolio
export const addToPortfolio = (stock) => {
  const portfolio = getPortfolio();
  
  // Check if stock already exists in portfolio
  const existingIndex = portfolio.findIndex(item => item.symbol === stock.symbol);
  
  if (existingIndex >= 0) {
    // Update existing position
    portfolio[existingIndex] = {
      ...portfolio[existingIndex],
      quantity: portfolio[existingIndex].quantity + stock.quantity,
      totalCost: portfolio[existingIndex].totalCost + (stock.price * stock.quantity)
    };
  } else {
    // Add new position
    portfolio.push({
      symbol: stock.symbol,
      name: stock.name,
      quantity: stock.quantity,
      purchasePrice: stock.price,
      purchaseDate: stock.date || new Date().toISOString(),
      totalCost: stock.price * stock.quantity
    });
  }
  
  // Save to local storage
  localStorage.setItem('portfolio', JSON.stringify(portfolio));
  return portfolio;
};

// Remove a stock from portfolio
export const removeFromPortfolio = (symbol) => {
  const portfolio = getPortfolio();
  const updatedPortfolio = portfolio.filter(stock => stock.symbol !== symbol);
  localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
  return updatedPortfolio;
};

// Update a stock in portfolio
export const updatePortfolioItem = (symbol, updates) => {
  const portfolio = getPortfolio();
  const updatedPortfolio = portfolio.map(stock => {
    if (stock.symbol === symbol) {
      return { ...stock, ...updates };
    }
    return stock;
  });
  
  localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
  return updatedPortfolio;
};

// Calculate portfolio performance
export const calculatePerformance = async (fetchCurrentPrices) => {
  const portfolio = getPortfolio();
  
  if (portfolio.length === 0) {
    return {
      totalInvested: 0,
      currentValue: 0,
      totalGain: 0,
      percentageGain: 0,
      holdings: []
    };
  }
  
  // Get current prices for all stocks in portfolio
  const symbols = portfolio.map(item => item.symbol);
  const currentPrices = await fetchCurrentPrices(symbols);
  
  let totalInvested = 0;
  let currentValue = 0;
  const holdings = [];
  
  portfolio.forEach(stock => {
    const currentPrice = currentPrices[stock.symbol] || 0;
    const invested = stock.totalCost;
    const value = currentPrice * stock.quantity;
    
    totalInvested += invested;
    currentValue += value;
    
    holdings.push({
      ...stock,
      currentPrice,
      currentValue: value,
      gain: value - invested,
      percentageGain: ((value - invested) / invested) * 100
    });
  });
  
  return {
    totalInvested,
    currentValue,
    totalGain: currentValue - totalInvested,
    percentageGain: ((currentValue - totalInvested) / totalInvested) * 100,
    holdings
  };
};
