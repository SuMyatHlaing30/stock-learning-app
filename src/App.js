// src/App.js
import React, { useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import ScreenerPage from './pages/ScreenerPage';
import PortfolioPage from './pages/PortfolioPage';
import AnalysisPage from './pages/AnalysisPage';
import LearnPage from './pages/LearnPage';
import './styles.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Navigation options with mobile-friendly icons
  const navOptions = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'screener', label: 'Screener', icon: '🔍' },
    { id: 'portfolio', label: 'Portfolio', icon: '💼' },
    { id: 'analysis', label: 'Analysis', icon: '📈' },
    { id: 'learn', label: 'Learn', icon: '📚' }
  ];
  
  // Render the current page
  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'screener':
        return <ScreenerPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'analysis':
        return <AnalysisPage />;
      case 'learn':
        return <LearnPage />;
      default:
        return <DashboardPage />;
    }
  };
  
  return (
    <div className="app">
      <header className="header">
        <div className="container nav-container">
          <div className="logo">
            <span>🚀 StockLearner</span>
          </div>
          
          <nav>
            <ul className="nav-links">
              {navOptions.map(option => (
                <li key={option.id}>
                  <a
                    href={`#${option.id}`}
                    className={currentPage === option.id ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(option.id);
                    }}
                  >
                    <span>{option.icon}</span>
                    {option.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container">
        {renderPage()}
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>StockLearner App - Learn, Track, and Improve Your Stock Investments</p>
          <p><small>This app is for educational purposes only. Not financial advice.</small></p>
        </div>
      </footer>
    </div>
  );
};

export default App;