import React, { useState } from 'react';
import questions from './questions.json';
import './App.css';

const QuestionSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setShowAll(false);
  };

  const handleToggleIndex = () => {
    setShowAll(!showAll);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setShowAll(false);
  };

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const questionsToDisplay = showAll || searchTerm ? filteredQuestions : [];

  return (
    <div className="question-search">
      <input
        type="text"
        placeholder="Search for a Topic..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleToggleIndex}>
        {showAll ? 'Hide Index' : 'Show Index'}
      </button>
      <button onClick={handleClearSearch}>Clear Search</button>
      <div>
        {questionsToDisplay.map((question) => (
          <div key={question.id} className="question-details">
            <h2>{question.title}</h2>
            <p>{question.content}</p>
            {[1, 2, 3, 4, 5, 6].map((num) =>
              question[`point${num}`] ? (
                <p key={num} dangerouslySetInnerHTML={{ __html: question[`point${num}`] }} />
              ) : null
            )}
            <div dangerouslySetInnerHTML={{ __html: question.image }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionSearch;