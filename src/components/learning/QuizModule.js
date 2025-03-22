import React, { useState } from 'react';

const QuizModule = ({ quiz, onComplete, onCancel }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  if (!quiz || quiz.length === 0) {
    return (
      <div className="quiz-module">
        <p>No quiz questions available.</p>
        <button onClick={onCancel}>Back to Content</button>
      </div>
    );
  }
  
  const handleOptionSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const calculateScore = () => {
    let correct = 0;
    quiz.forEach((question, index) => {
      if (answers[index] === question.correctIndex) {
        correct++;
      }
    });
    return {
      correct,
      total: quiz.length,
      percentage: Math.round((correct / quiz.length) * 100)
    };
  };
  
  const handleComplete = () => {
    const score = calculateScore();
    onComplete(score);
  };
  
  if (showResults) {
    const score = calculateScore();
    return (
      <div className="quiz-results">
        <h2>Quiz Results</h2>
        <p>You scored {score.correct} out of {score.total} ({score.percentage}%)</p>
        <button onClick={handleComplete}>Complete Quiz</button>
      </div>
    );
  }
  
  const question = quiz[currentQuestion];
  
  return (
    <div className="quiz-module">
      <h2>Quiz</h2>
      <div className="question-progress">
        Question {currentQuestion + 1} of {quiz.length}
      </div>
      
      <div className="question">
        <h3>{question.question}</h3>
        <div className="options">
          {question.options.map((option, index) => (
            <div 
              key={index}
              className={`option ${answers[currentQuestion] === index ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(index)}
            >
              <input 
                type="radio" 
                name={`question-${currentQuestion}`} 
                checked={answers[currentQuestion] === index}
                readOnly
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="quiz-controls">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button 
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          onClick={handleNext}
          disabled={answers[currentQuestion] === undefined}
        >
          {currentQuestion < quiz.length - 1 ? 'Next' : 'See Results'}
        </button>
      </div>
    </div>
  );
};

export default QuizModule;