import React, { useState, useEffect, useRef } from 'react';
import questions from './questions.json';
import './App.css';

const QuestionSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const searchInputRef = useRef(null);

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
    searchInputRef.current.focus();
  };

  const scrollToQuestion = (id) => {
    const element = document.getElementById(`question-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollFunction = () => {
    const mybutton = document.getElementById("myBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollFunction);
    return () => window.removeEventListener('scroll', scrollFunction);
  }, []);

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
        ref={searchInputRef}
      />
      <div className="button-group">
        <button className='primary-button' onClick={handleToggleIndex}>
          {showAll ? 'Hide Index' : 'Show Index'}
        </button>
        <button onClick={handleClearSearch}>Clear Search</button>
      </div>
      {showAll && (
        <div className="title-list">
          {questions.map((question) => (
            <a
              key={question.id}
              href={`#question-${question.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToQuestion(question.id);
              }}
            >
              {question.id}. {question.title}
            </a>
          ))}
        </div>
      )}
      <div>
        {questionsToDisplay.map((question) => (
          <div key={question.id} id={`question-${question.id}`} className="question-details">
            <h2>{question.id}. {question.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: question.content }} ></p>
            {Object.keys(question)
              .filter(key => key.startsWith('point'))
              .map((pointKey, index) => 
                question[pointKey] ? (
                  <p key={index} dangerouslySetInnerHTML={{ __html: question[pointKey] }} />
                ) : null
              )}
            <div dangerouslySetInnerHTML={{ __html: question.image }} />
          </div>
        ))}
      </div>
      <button id="myBtn" className="scroll-top" onClick={scrollToTop}>
     &nbsp; &#8593; &nbsp;
      </button>
    </div>
  );
};

export default QuestionSearch;