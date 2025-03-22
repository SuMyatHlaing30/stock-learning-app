// src/pages/LearnPage.js
import React, { useState, useEffect } from 'react';
import '../components/learning/Learning.css';
import QuizModule from '../components/learning/QuizModule';
import ProgressBar from '../components/learning/ProgressBar';
import InteractiveDemo from '../components/learning/InteractiveDemo';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Import content loaders
import { loadLearningPaths, loadTopic, loadGlossaryTerms } from '../utils/contentLoader';
import { getUserProgress, saveProgress } from '../utils/userProgress';

const LearnPage = () => {
  // State management
  const [pathId, setPathId] = useState(null);
  const [topicId, setTopicId] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [topicLoading, setTopicLoading] = useState(false);
  const [learningPaths, setLearningPaths] = useState(null);
  const [currentPath, setCurrentPath] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [quizActive, setQuizActive] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [glossaryTerms, setGlossaryTerms] = useState([]);
  const [glossaryFilter, setGlossaryFilter] = useState('');
  
  // Load learning paths on initial render
  useEffect(() => {
    const fetchLearningPaths = async () => {
      const paths = await loadLearningPaths();
      setLearningPaths(paths);
    };
    
    fetchLearningPaths();
    
    // Load user progress from local storage
    const progress = getUserProgress();
    setUserProgress(progress);
  }, []);
  
  // Load topic when topicId changes
  useEffect(() => {
    const fetchTopic = async () => {
      if (!topicId) return;
      
      setTopicLoading(true);
      const topic = await loadTopic(topicId);
      setCurrentTopic(topic);
      setTopicLoading(false);
    };
    
    fetchTopic();
  }, [topicId]);
  
  // Load glossary terms when glossary is shown
  useEffect(() => {
    const fetchGlossary = async () => {
      const terms = await loadGlossaryTerms();
      setGlossaryTerms(terms);
    };
    
    if (showGlossary) {
      fetchGlossary();
    }
  }, [showGlossary]);
  
  // Navigate to a path
  const navigateToPath = (newPathId) => {
    setPathId(newPathId);
    setTopicId(null);
    
    if (learningPaths && learningPaths[newPathId]) {
      setCurrentPath(learningPaths[newPathId]);
    }
  };
  
  // Navigate to a topic
  const navigateToTopic = (newPathId, newTopicId) => {
    setPathId(newPathId);
    setTopicId(newTopicId);
    
    if (learningPaths && learningPaths[newPathId]) {
      setCurrentPath(learningPaths[newPathId]);
    }
  };
  
  // Mark topic as completed
  const completeTopic = () => {
    if (!currentTopic) return;
    
    const updatedProgress = {...userProgress};
    
    if (!updatedProgress.completedTopics) {
      updatedProgress.completedTopics = [];
    }
    
    if (!updatedProgress.completedTopics.includes(currentTopic.id)) {
      updatedProgress.completedTopics.push(currentTopic.id);
      saveProgress(updatedProgress);
      setUserProgress(updatedProgress);
    }
  };
  
  // Navigate to next topic
  const goToNextTopic = () => {
    if (!currentTopic || !currentTopic.nextTopic || !currentPath) return;
    navigateToTopic(pathId, currentTopic.nextTopic);
  };
  
  // Handle quiz completion
  const handleQuizComplete = (score) => {
    // Save score to user progress
    const updatedProgress = {...userProgress};
    if (!updatedProgress.quizScores) {
      updatedProgress.quizScores = {};
    }
    updatedProgress.quizScores[currentTopic.id] = score;
    saveProgress(updatedProgress);
    setUserProgress(updatedProgress);
    
    // Mark topic as completed
    completeTopic();
    
    // Hide quiz
    setQuizActive(false);
  };
  
  // Check if user has completed prerequisites
  const hasCompletedPrerequisites = () => {
    if (!currentTopic || !currentTopic.prerequisites || currentTopic.prerequisites.length === 0) {
      return true;
    }
    
    if (!userProgress || !userProgress.completedTopics) {
      return false;
    }
    
    return currentTopic.prerequisites.every(prereq => 
      userProgress.completedTopics.includes(prereq)
    );
  };
  
  // Calculate path progress percentage
  const calculatePathProgress = () => {
    if (!currentPath || !userProgress || !userProgress.completedTopics) {
      return 0;
    }
    
    const completedInPath = currentPath.modules.filter(
      moduleId => userProgress.completedTopics.includes(moduleId)
    ).length;
    
    return Math.round((completedInPath / currentPath.modules.length) * 100);
  };
  
  // Toggle glossary sidebar
  const toggleGlossary = () => {
    setShowGlossary(!showGlossary);
  };
  
  // If still loading initial data
  if (!learningPaths) {
    return <LoadingSpinner message="Loading learning content..." />;
  }
  
  // If no path is selected, show path selection screen
  if (!pathId) {
    return (
      <div className="learn-page paths-selection">
        <h1>Stock Market Learning Paths</h1>
        <p className="intro-text">
          Choose a learning path based on your current knowledge level and goals.
        </p>
        
        <div className="path-cards">
          {Object.values(learningPaths).map(path => (
            <div 
              key={path.id}
              className="path-card"
              onClick={() => navigateToPath(path.id)}
            >
              <div className="path-image">
                <img src={path.image || '/images/placeholder.jpg'} alt={path.name} />
              </div>
              <h2>{path.name}</h2>
              <p>{path.description}</p>
              <div className="path-meta">
                <span>{path.estimatedHours} hours</span>
                <span>{path.difficulty}</span>
              </div>
              <button className="primary-button">Start Learning</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // If path is selected but no topic, show path overview
  if (!topicId && currentPath) {
    return (
      <div className="learn-page path-overview">
        <h1>{currentPath.name}</h1>
        <p className="path-description">{currentPath.description}</p>
        
        <div className="path-progress">
          <ProgressBar percentage={calculatePathProgress()} />
          <p>Your progress: {calculatePathProgress()}% complete</p>
        </div>
        
        <h2>Modules in this Path</h2>
        <div className="module-list">
          {currentPath.modules.map((moduleId, index) => {
            // Check if the module has been completed
            const isCompleted = userProgress?.completedTopics?.includes(moduleId);
            const isAvailable = index === 0 || 
              userProgress?.completedTopics?.includes(currentPath.modules[index-1]);
            
            return (
              <div 
                key={moduleId} 
                className={`module-item ${isCompleted ? 'completed' : ''} ${isAvailable ? 'available' : 'locked'}`}
                onClick={() => isAvailable && navigateToTopic(pathId, moduleId)}
              >
                <div className="module-number">{index + 1}</div>
                <div className="module-info">
                  <h3>{moduleId}</h3>
                  <p>Loading...</p>
                </div>
                <div className="module-status">
                  {isCompleted ? (
                    <span className="status-icon completed">✓</span>
                  ) : isAvailable ? (
                    <span className="status-icon available">→</span>
                  ) : (
                    <span className="status-icon locked">🔒</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="start-learning">
          <button 
            className="primary-button"
            onClick={() => navigateToTopic(pathId, currentPath.modules[0])}
          >
            {userProgress?.completedTopics?.length > 0 ? 'Continue Learning' : 'Start Learning'}
          </button>
        </div>
      </div>
    );
  }
  
  // Show loading state while fetching topic
  if (topicLoading) {
    return <LoadingSpinner message="Loading topic content..." />;
  }
  
  // If topic not found
  if (!currentTopic) {
    return (
      <div className="error-state">
        <h2>Topic Not Found</h2>
        <p>Sorry, we couldn't find the requested topic.</p>
        <button 
          className="primary-button"
          onClick={() => navigateToPath(pathId)}
        >
          Return to Path Overview
        </button>
      </div>
    );
  }
  
  // Render topic content
  return (
    <div className="learn-page topic-view">
      <div className="learning-header">
        <div className="path-info">
          <h3>{currentPath?.name}</h3>
          <ProgressBar percentage={calculatePathProgress()} />
        </div>
        
        <button className="glossary-button" onClick={toggleGlossary}>
          Glossary {showGlossary ? '✕' : '📖'}
        </button>
      </div>
      
      <div className="learning-content-wrapper">
        <div className={`learning-content ${showGlossary ? 'with-glossary' : ''}`}>
          {!hasCompletedPrerequisites() && (
            <div className="prerequisites-warning">
              <h3>Prerequisites Needed</h3>
              <p>To get the most out of this topic, please complete these modules first:</p>
              <ul>
                {currentTopic.prerequisites.map((prereqId) => (
                  <li key={prereqId}>
                    <button 
                      className="link-button"
                      onClick={() => navigateToTopic(pathId, prereqId)}
                    >
                      {prereqId}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {quizActive ? (
            <QuizModule 
              quiz={currentTopic.quiz} 
              onComplete={handleQuizComplete}
              onCancel={() => setQuizActive(false)}
            />
          ) : (
            <>
              <h1>{currentTopic.title}</h1>
              
              <div className="topic-meta">
                <span className="difficulty">{currentTopic.difficulty}</span>
                <span className="reading-time">{currentTopic.estimatedMinutes} minutes</span>
              </div>
              
              {/* Featured image if available */}
              {currentTopic.image && (
                <div className="topic-image">
                  <img src={currentTopic.image} alt={currentTopic.title} />
                </div>
              )}
              
              {/* Video if available */}
              {currentTopic.videoUrl && (
                <div className="topic-video">
                  <video 
                    controls
                    poster={currentTopic.image}
                    src={currentTopic.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              
              <div 
                className="topic-content"
                dangerouslySetInnerHTML={{ __html: currentTopic.content }}
              />
              
              {/* Interactive demo if available */}
              {currentTopic.interactiveDemo && (
                <InteractiveDemo demoId={currentTopic.interactiveDemo} />
              )}
              
              <div className="topic-actions">
                {currentTopic.quiz && currentTopic.quiz.length > 0 ? (
                  <button 
                    className="primary-button take-quiz-button"
                    onClick={() => setQuizActive(true)}
                  >
                    Take Quiz to Complete
                  </button>
                ) : (
                  <button 
                    className="primary-button mark-complete-button"
                    onClick={() => {
                      completeTopic();
                      goToNextTopic();
                    }}
                  >
                    Mark as Complete & Continue
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        
        {/* Glossary sidebar */}
        {showGlossary && (
          <div className="glossary-sidebar">
            <h2>Stock Market Glossary</h2>
            <input 
              type="text" 
              className="glossary-search" 
              placeholder="Search terms..."
              value={glossaryFilter}
              onChange={(e) => setGlossaryFilter(e.target.value)}
            />
            
            <div className="glossary-items">
              {glossaryTerms
                .filter(item => 
                  item.term.toLowerCase().includes(glossaryFilter.toLowerCase()) || 
                  item.definition.toLowerCase().includes(glossaryFilter.toLowerCase())
                )
                .map(item => (
                  <div key={item.term} className="glossary-item">
                    <h4>{item.term}</h4>
                    <p>{item.definition}</p>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnPage;