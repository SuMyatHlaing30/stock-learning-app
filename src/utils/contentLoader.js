// src/utils/contentLoader.js

/**
 * Content Loader System
 * Handles fetching learning content from external files
 */

// Content cache to avoid repeated file loading
const contentCache = {
  topics: {},
  paths: null
};

/**
 * Loads learning paths configuration
 * @returns {Promise<Object>} Learning paths data
 */
export const loadLearningPaths = async () => {
  // Return from cache if available
  if (contentCache.paths) {
    return contentCache.paths;
  }
  
  try {
    // Fetch learning paths config file
    const response = await fetch('/content/learning/paths.json');
    const data = await response.json();
    
    // Store in cache
    contentCache.paths = data;
    return data;
  } catch (error) {
    console.error('Error loading learning paths:', error);
    return {};
  }
};

/**
 * Loads a specific topic's content
 * @param {string} topicId - The ID of the topic to load
 * @returns {Promise<Object>} Topic content
 */
// src/utils/contentLoader.js
export const loadTopic = async (topicId) => {
    // Return from cache if available
    if (contentCache.topics[topicId]) {
      return contentCache.topics[topicId];
    }
    
    try {
      // Convert underscores to hyphens in the topicId
      const formattedTopicId = topicId.replace(/_/g, '-');
      
      // Remove the "-json" suffix if it was added in the path.json modules list
      const url = `/content/learning/${formattedTopicId}.json`;
      console.log(`Fetching topic from: ${url}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to load topic: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Store in cache
      contentCache.topics[topicId] = data;
      return data;
    } catch (error) {
      console.error(`Error loading topic ${topicId}:`, error);
      return null;
    }
  };
/**
 * Clears the content cache to force fresh loading
 */
export const clearContentCache = () => {
  contentCache.topics = {};
  contentCache.paths = null;
};

/**
 * Preloads a set of topics to improve user experience
 * @param {Array<string>} topicIds - Array of topic IDs to preload
 */
export const preloadTopics = async (topicIds) => {
  const loadPromises = topicIds.map(id => loadTopic(id));
  await Promise.all(loadPromises);
};
// Add this function to your src/utils/contentLoader.js
export const loadGlossaryTerms = async () => {
  try {
    const response = await fetch('/content/learning/glossary-json.json');
    const data = await response.json();
    return data.terms;
  } catch (error) {
    console.error('Error loading glossary terms:', error);
    return [];
  }
};
