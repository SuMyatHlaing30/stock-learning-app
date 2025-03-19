// src/components/common/StockChart.js
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockChart = ({ data }) => {
  const [timeRange, setTimeRange] = useState('1y');
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    if (!data || data.length === 0) return [];
    
    const now = new Date();
    let cutoffDate;
    
    switch(timeRange) {
      case '1m':
        cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case '3m':
        cutoffDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case '6m':
        cutoffDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case 'ytd':
        cutoffDate = new Date(now.getFullYear(), 0, 1);
        break;
      case '1y':
      default:
        cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
    }
    
    return data.filter(item => new Date(item.date) >= cutoffDate);
  };
  
  const filteredData = getFilteredData();
  
  return (
    <div className="stock-chart">
      <div className="chart-controls">
        <button 
          className={timeRange === '1m' ? 'active' : ''} 
          onClick={() => setTimeRange('1m')}
        >
          1M
        </button>
        <button 
          className={timeRange === '3m' ? 'active' : ''} 
          onClick={() => setTimeRange('3m')}
        >
          3M
        </button>
        <button 
          className={timeRange === '6m' ? 'active' : ''} 
          onClick={() => setTimeRange('6m')}
        >
          6M
        </button>
        <button 
          className={timeRange === 'ytd' ? 'active' : ''} 
          onClick={() => setTimeRange('ytd')}
        >
          YTD
        </button>
        <button 
          className={timeRange === '1y' ? 'active' : ''} 
          onClick={() => setTimeRange('1y')}
        >
          1Y
        </button>
      </div>
      
      <div className="chart-container">
        {filteredData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={filteredData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => {
                  // Format date ticks based on range
                  const date = new Date(value);
                  if (timeRange === '1m') {
                    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
                  }
                  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                }}
              />
              <YAxis 
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                labelFormatter={(value) => `Date: ${new Date(value).toLocaleDateString()}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#2e7d32"
                activeDot={{ r: 8 }}
                name="Close Price"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="no-data-message">No chart data available</div>
        )}
      </div>
    </div>
  );
};

export default StockChart;
