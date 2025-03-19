// src/pages/LearnPage.js
import React, { useState } from 'react';

const LearnPage = () => {
  const [currentTopic, setCurrentTopic] = useState('intro');
  
  const topics = [
    {
      id: 'intro',
      title: 'Introduction to Stocks',
      content: `
        <h2>What is a Stock?</h2>
        <p>A stock represents ownership in a company. When you buy a stock, you're purchasing a small piece of that company, which makes you a shareholder. Companies issue stocks to raise money for growth, research, or paying off debt.</p>
        
        <h3>Key Stock Market Concepts</h3>
        <ul>
          <li><strong>Share</strong>: A single unit of ownership in a company</li>
          <li><strong>Market Capitalization</strong>: The total value of a company (share price × total shares)</li>
          <li><strong>Dividends</strong>: Payments made by companies to shareholders from profits</li>
          <li><strong>Bull Market</strong>: A market that is rising or expected to rise</li>
          <li><strong>Bear Market</strong>: A market that is falling or expected to fall</li>
        </ul>
        
        <h3>Why Invest in Stocks?</h3>
        <p>Stocks have historically provided higher returns than other investments like bonds or savings accounts over long periods. They offer:</p>
        <ul>
          <li>Potential for capital appreciation (stock price increase)</li>
          <li>Income through dividends</li>
          <li>Ownership in real businesses</li>
          <li>A hedge against inflation</li>
        </ul>
        
        <h3>Stock Market Basics</h3>
        <p>Stocks are traded on exchanges like the New York Stock Exchange (NYSE) or NASDAQ. When people talk about "the market," they're often referring to major indices like:</p>
        <ul>
          <li><strong>S&P 500</strong>: 500 large U.S. companies</li>
          <li><strong>Dow Jones Industrial Average</strong>: 30 significant U.S. companies</li>
          <li><strong>NASDAQ Composite</strong>: Heavily weighted toward technology companies</li>
        </ul>
      `
    },
    {
      id: 'investing-basics',
      title: 'Investing Basics',
      content: `
        <h2>Getting Started with Investing</h2>
        
        <h3>Before You Invest</h3>
        <p>Before putting your money in stocks, make sure you:</p>
        <ul>
          <li>Have an emergency fund (3-6 months of expenses)</li>
          <li>Have paid off high-interest debt</li>
          <li>Understand your investment goals and time horizon</li>
          <li>Are comfortable with the risk level</li>
        </ul>
        
        <h3>Investment Accounts</h3>
        <p>Common account types include:</p>
        <ul>
          <li><strong>Brokerage Account</strong>: A standard investment account with no special tax advantages</li>
          <li><strong>Retirement Accounts</strong>: Tax-advantaged accounts like 401(k)s or IRAs</li>
        </ul>
        
        <h3>Creating an Investment Plan</h3>
        <ol>
          <li>Define your goals (retirement, house down payment, etc.)</li>
          <li>Determine your time horizon (when you'll need the money)</li>
          <li>Assess your risk tolerance (how much volatility you can handle)</li>
          <li>Choose an asset allocation (mix of stocks, bonds, etc.)</li>
          <li>Select specific investments</li>
        </ol>
        
        <h3>How Much to Invest</h3>
        <p>Start with what you're comfortable with, even if it's small. Consider:</p>
        <ul>
          <li>Investing a percentage of your income (10-15% is common for retirement)</li>
          <li>Setting up automatic investments (dollar-cost averaging)</li>
          <li>Gradually increasing your investment amount over time</li>
        </ul>
        
        <h3>The Power of Compounding</h3>
        <p>Einstein allegedly called compound interest "the eighth wonder of the world." When your earnings generate more earnings, your money can grow exponentially over time. This is why starting early, even with small amounts, can lead to significant wealth.</p>
      `
    },
    {
      id: 'stock-analysis',
      title: 'Stock Analysis Methods',
      content: `
        <h2>How to Analyze Stocks</h2>
        
        <h3>Fundamental Analysis</h3>
        <p>Examines a company's financial health and business prospects to determine its intrinsic value.</p>
        
        <h4>Key Metrics:</h4>
        <ul>
          <li><strong>P/E Ratio</strong>: Price-to-Earnings ratio compares a company's share price to its earnings per share. Lower can indicate better value.</li>
          <li><strong>EPS</strong>: Earnings Per Share shows how much profit a company allocates to each outstanding share.</li>
          <li><strong>P/B Ratio</strong>: Price-to-Book ratio compares a company's market value to its book value.</li>
          <li><strong>Debt-to-Equity</strong>: Measures a company's financial leverage. Lower is generally safer.</li>
          <li><strong>ROE</strong>: Return on Equity shows how efficiently a company uses shareholder equity to generate profit.</li>
        </ul>
        
        <h3>Technical Analysis</h3>
        <p>Studies price movements and trading volumes to identify patterns and trends.</p>
        
        <h4>Common Techniques:</h4>
        <ul>
          <li><strong>Moving Averages</strong>: Smooth out price data to identify trends</li>
          <li><strong>Support and Resistance</strong>: Price levels where stocks tend to stop falling or rising</li>
          <li><strong>Chart Patterns</strong>: Recognizable shapes in price charts that may indicate future movements</li>
          <li><strong>Volume Analysis</strong>: Studying trading volume to confirm price movements</li>
        </ul>
        
        <h3>Which Approach to Use?</h3>
        <p>For beginners, fundamental analysis is often more accessible and aligns better with long-term investing. Many successful investors use a combination of both approaches.</p>
        
        <h3>Warning Signs to Watch For</h3>
        <ul>
          <li>Declining revenue or profit margins</li>
          <li>Increasing debt levels</li>
          <li>Management turnover</li>
          <li>Accounting irregularities</li>
          <li>Overvaluation compared to peers</li>
        </ul>
      `
    },
    {
      id: 'investment-strategies',
      title: 'Investment Strategies',
      content: `
        <h2>Popular Investment Strategies</h2>
        
        <h3>Long-Term Buy and Hold</h3>
        <p>This strategy involves buying quality stocks and holding them for years or decades, regardless of short-term market fluctuations.</p>
        <p><strong>Benefits:</strong> Lower transaction costs, tax efficiency, takes advantage of long-term market growth, less time-intensive</p>
        <p><strong>Best for:</strong> Most beginning investors, especially those investing for retirement</p>
        
        <h3>Value Investing</h3>
        <p>Made famous by Warren Buffett, value investing seeks stocks trading below their intrinsic value.</p>
        <p><strong>Key metrics:</strong> Low P/E ratio, P/B ratio, high dividend yield, strong balance sheet</p>
        <p><strong>Best for:</strong> Patient investors who can go against market sentiment</p>
        
        <h3>Growth Investing</h3>
        <p>Focuses on companies with strong growth potential, often in revenue and earnings.</p>
        <p><strong>Key metrics:</strong> Revenue growth rate, earnings growth, market opportunity</p>
        <p><strong>Best for:</strong> Investors willing to accept higher volatility for potentially higher returns</p>
        
        <h3>Dividend Investing</h3>
        <p>Targets companies that pay regular dividends, providing income in addition to potential price appreciation.</p>
        <p><strong>Key metrics:</strong> Dividend yield, dividend growth rate, payout ratio, dividend history</p>
        <p><strong>Best for:</strong> Income-focused investors or those nearing retirement</p>
        
        <h3>Index Investing</h3>
        <p>Invests in funds that track market indices rather than picking individual stocks.</p>
        <p><strong>Benefits:</strong> Broad diversification, low fees, historically outperforms most active strategies</p>
        <p><strong>Best for:</strong> Most investors, especially beginners or those without time to research individual stocks</p>
        
        <h3>Recommended for Beginners</h3>
        <p>For most beginners, a combination of index investing for core holdings, with perhaps a small portion allocated to individual stocks you understand well, is a sound approach. This provides diversification while allowing you to learn about stock selection.</p>
      `
    },
    {
      id: 'risk-management',
      title: 'Risk Management',
      content: `
        <h2>Managing Investment Risk</h2>
        
        <h3>Types of Investment Risk</h3>
        <ul>
          <li><strong>Market Risk:</strong> The risk that the entire market will decline</li>
          <li><strong>Company Risk:</strong> Risks specific to individual companies</li>
          <li><strong>Sector Risk:</strong> Risks affecting a specific industry</li>
          <li><strong>Inflation Risk:</strong> The risk that inflation will erode your purchasing power</li>
          <li><strong>Liquidity Risk:</strong> The risk of not being able to sell an investment quickly</li>
        </ul>
        
        <h3>Key Risk Management Strategies</h3>
        
        <h4>1. Diversification</h4>
        <p>Don't put all your eggs in one basket. Spread investments across:</p>
        <ul>
          <li>Multiple companies</li>
          <li>Different sectors/industries</li>
          <li>Various asset classes (stocks, bonds, etc.)</li>
          <li>Geographic regions (U.S., international)</li>
        </ul>
        
        <h4>2. Position Sizing</h4>
        <p>Limit how much you invest in any single stock. A common rule for beginners:</p>
        <ul>
          <li>No more than 5% of your portfolio in any single stock</li>
          <li>No more than 20% in any single sector</li>
        </ul>
        
        <h4>3. Dollar-Cost Averaging</h4>
        <p>Invest a fixed amount at regular intervals regardless of market conditions. This reduces the impact of market timing and volatility.</p>
        
        <h4>4. Set Stop Losses</h4>
        <p>Decide in advance at what point you'll sell if an investment performs poorly. This helps limit potential losses.</p>
        
        <h4>5. Rebalancing</h4>
        <p>Periodically adjust your portfolio back to your target allocation. This enforces "buy low, sell high" discipline.</p>
        
        <h3>Emotional Risk Management</h3>
        <p>Your own behavior can be the biggest risk to your investments:</p>
        <ul>
          <li>Avoid panic selling during market downturns</li>
          <li>Don't chase performance or the latest hot stock</li>
          <li>Stick to your investment plan and strategy</li>
          <li>Focus on long-term goals rather than short-term fluctuations</li>
        </ul>
      `
    },
    {
      id: 'common-mistakes',
      title: 'Common Beginner Mistakes',
      content: `
        <h2>Common Mistakes to Avoid</h2>
        
        <h3>1. Trying to Time the Market</h3>
        <p>Even professional investors can't consistently predict market movements. Instead of trying to buy at the "perfect" time, focus on time in the market rather than timing the market.</p>
        
        <h3>2. Investing Without a Plan</h3>
        <p>Having a clear investment strategy helps you make rational decisions and avoid impulsive moves based on emotions or market fluctuations.</p>
        
        <h3>3. Neglecting Diversification</h3>
        <p>Putting too much money in a single stock or sector significantly increases your risk. Even great companies can face unexpected problems.</p>
        
        <h3>4. Chasing Performance</h3>
        <p>Buying stocks just because they've risen recently or are getting media attention often leads to buying high and selling low—the opposite of successful investing.</p>
        
        <h3>5. Emotional Decision-Making</h3>
        <p>Fear and greed are the enemies of good investment decisions. Having a plan and sticking to it helps overcome emotional reactions.</p>
        
        <h3>6. Checking Your Portfolio Too Frequently</h3>
        <p>Constant portfolio checking can lead to overreaction to short-term movements. For long-term investors, weekly or monthly checks are sufficient.</p>
        
        <h3>7. Focusing Too Much on Fees</h3>
        <p>While high fees can erode returns, extremely low fees shouldn't be the only consideration. Quality and suitability matter too.</p>
        
        <h3>8. Ignoring Taxes</h3>
        <p>Tax implications can significantly impact your net returns. Consider tax-efficient investment strategies and account types.</p>
        
        <h3>9. Trading Too Frequently</h3>
        <p>Excessive trading increases costs and taxes, and often leads to worse performance than a buy-and-hold approach.</p>
        
        <h3>10. Getting Investment Advice from Unreliable Sources</h3>
        <p>Social media, friends, or "hot tips" are not reliable bases for investment decisions. Do your own research or consult qualified financial advisors.</p>
      `
    }
  ];
  
  const selectedTopic = topics.find(topic => topic.id === currentTopic);
  
  return (
    <div className="learn-page">
      <h1>Stock Market Learning Center</h1>
      
      <div className="learning-container">
        <div className="topics-sidebar">
          <h3>Topics</h3>
          <ul className="topic-list">
            {topics.map(topic => (
              <li 
                key={topic.id}
                className={topic.id === currentTopic ? 'active' : ''}
                onClick={() => setCurrentTopic(topic.id)}
              >
                {topic.title}
              </li>
            ))}
          </ul>
          
          <div className="learning-resources">
            <h3>Additional Resources</h3>
            <ul>
              <li>Investopedia - Stock Market Basics</li>
              <li>The Intelligent Investor by Benjamin Graham</li>
              <li>SEC's Introduction to Investing</li>
              <li>Khan Academy - Finance and Capital Markets</li>
            </ul>
          </div>
        </div>
        
        <div className="topic-content">
          {selectedTopic && (
            <div dangerouslySetInnerHTML={{ __html: selectedTopic.content }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
