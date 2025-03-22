import React from 'react';

const InteractiveDemo = ({ demoId }) => {
  // This would eventually load different interactive demos based on the ID
  const renderDemo = () => {
    switch (demoId) {
      case 'market_simulator':
        return <div className="demo-placeholder">Market Simulator Demo (Coming Soon)</div>;
      case 'trading_simulator':
        return <div className="demo-placeholder">Trading Simulator Demo (Coming Soon)</div>;
      default:
        return <div className="demo-placeholder">Interactive Demo (Coming Soon)</div>;
    }
  };

  return (
    <div className="interactive-demo">
      <h3>Interactive Demo</h3>
      <div className="demo-container">
        {renderDemo()}
      </div>
    </div>
  );
};

export default InteractiveDemo;