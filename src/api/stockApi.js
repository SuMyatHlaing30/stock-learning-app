// src/api/stockApi.js

const API_KEY = 'd4b7be3b0fmsh6ebba7766962532p187ef6jsn6da78ce7cd0a'; // You'll need to sign up for RapidAPI

// Fetch stock quote data
export const fetchStockQuote = async (symbol) => {
  try {
    const response = await fetch(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}`, {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
};

// Fetch historical data
export const fetchHistoricalData = async (symbol, interval = '1d', range = '1y') => {
  try {
    const response = await fetch(
      `https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${symbol}/${interval}/${range}`, {
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
      });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

// Search for stocks
export const searchStocks = async (query) => {
  try {
    const response = await fetch(
      `https://yahoo-finance15.p.rapidapi.com/api/yahoo/au/search/${query}`, {
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
      });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data.body;
  } catch (error) {
    console.error('Error searching stocks:', error);
    throw error;
  }
};

// Fetch company profile and fundamentals
export const fetchCompanyProfile = async (symbol) => {
  try {
    const response = await fetch(
      `https://yahoo-finance15.p.rapidapi.com/api/yahoo/mo/module/${symbol}/asset-profile`, {
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
      });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching company profile:', error);
    throw error;
  }
};
