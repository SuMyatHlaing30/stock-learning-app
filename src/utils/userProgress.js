// src/utils/userProgress.js

/**
 * User Progress Management
 * Handles saving and retrieving user learning progress
 */

const PROGRESS_STORAGE_KEY = 'stock_learn_user_progress';

/**
 * Loads user progress from localStorage
 * @returns {Object} User progress data
 */
export const getUserProgress = () => {
  try {
    const storedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (storedProgress) {
      return JSON.parse(storedProgress);
    }
    
    // Return default empty progress object if nothing stored
    return {
      completedTopics: [],
      quizScores: {},
      lastAccessed: null,
      favoriteTopics: []
    };
  } catch (error) {
    console.error('Error loading user progress:', error);
    return {
      completedTopics: [],
      quizScores: {},
      lastAccessed: null,
      favoriteTopics: []
    };
  }
};

/**
 * Saves user progress to localStorage
 * @param {Object} progressData - User progress data to save
 */
export const saveProgress = (progressData) => {
  try {
    // Update last accessed timestamp
    progressData.lastAccessed = new Date().toISOString();
    
    // Save to localStorage
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressData));
    
    // If you have a backend API, you could also sync here
    // syncProgressToServer(progressData);
    
    return true;
  } catch (error) {
    console.error('Error saving user progress:', error);
    return false;
  }
};

/**
 * Marks a topic as favorite
 * @param {string} topicId - ID of the topic to favorite
 * @returns {boolean} Success status
 */
export const toggleTopicFavorite = (topicId) => {
  try {
    const progressData = getUserProgress();
    
    if (!progressData.favoriteTopics) {
      progressData.favoriteTopics = [];
    }
    
    // Toggle favorite status
    const index = progressData.favoriteTopics.indexOf(topicId);
    if (index > -1) {
      // Remove from favorites
      progressData.favoriteTopics.splice(index, 1);
    } else {
      // Add to favorites
      progressData.favoriteTopics.push(topicId);
    }
    
    // Save updated progress
    saveProgress(progressData);
    return true;
  } catch (error) {
    console.error('Error toggling topic favorite:', error);
    return false;
  }
};

/**
 * Calculates completion percentage for a learning path
 * @param {Array<string>} pathModules - Array of module IDs in the path
 * @returns {number} Completion percentage (0-100)
 */
export const calculatePathCompletion = (pathModules) => {
  if (!pathModules || pathModules.length === 0) {
    return 0;
  }
  
  const progressData = getUserProgress();
  
  if (!progressData.completedTopics || progressData.completedTopics.length === 0) {
    return 0;
  }
  
  const completedInPath = pathModules.filter(
    moduleId => progressData.completedTopics.includes(moduleId)
  ).length;
  
  return Math.round((completedInPath / pathModules.length) * 100);
};

/**
 * Resets all user progress
 * @returns {boolean} Success status
 */
export const resetProgress = () => {
  try {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error resetting user progress:', error);
    return false;
  }
};

/**
 * Gets the next recommended topic based on user progress
 * @param {Object} learningPaths - All available learning paths
 * @returns {Object} Recommendation with pathId and topicId
 */
export const getNextRecommendedTopic = (learningPaths) => {
  const progressData = getUserProgress();
  
  // Default recommendation (first topic of beginner path)
  const defaultRecommendation = {
    pathId: 'beginner_path',
    topicId: 'what_is_stock'
  };
  
  if (!progressData.lastAccessed || !progressData.completedTopics) {
    return defaultRecommendation;
  }
  
  // Find the path with in-progress topics
  for (const pathId in learningPaths) {
    const path = learningPaths[pathId];
    
    // Find first incomplete topic in this path
    for (let i = 0; i < path.modules.length; i++) {
      const moduleId = path.modules[i];
      
      if (!progressData.completedTopics.includes(moduleId)) {
        // Found the next topic to complete
        return {
          pathId,
          topicId: moduleId
        };
      }
    }
  }
  
  // If all topics completed, recommend review of last topic
  if (progressData.completedTopics.length > 0) {
    const lastCompletedTopic = progressData.completedTopics[progressData.completedTopics.length - 1];
    
    // Find which path this topic belongs to
    for (const pathId in learningPaths) {
      if (learningPaths[pathId].modules.includes(lastCompletedTopic)) {
        return {
          pathId,
          topicId: lastCompletedTopic,
          isReview: true
        };
      }
    }
  }
  
  // Default fallback
  return defaultRecommendation;
};