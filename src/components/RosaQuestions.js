import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import rosaQuestions from '../data/rosa.json';

const RosaQuestions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showIndex, setShowIndex] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    if (term) {
      setShowIndex(false);
      const filtered = rosaQuestions.filter(question =>
        question.title.toLowerCase().includes(term.toLowerCase()) ||
        question.content.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions([]);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredQuestions([]);
  };

  const toggleIndex = () => {
    setShowIndex(!showIndex);
    if (searchTerm) {
      setSearchTerm('');
      setFilteredQuestions([]);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToQuestion = (id) => {
    const element = document.getElementById(`question-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderQuestionContent = (question) => (
    <div key={question.id} id={`question-${question.id}`} className="question-card">
      <h3>{question.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: question.content }} />
      {question.point1 && <div dangerouslySetInnerHTML={{ __html: question.point1 }} />}
      {question.point2 && <div dangerouslySetInnerHTML={{ __html: question.point2 }} />}
      {question.point3 && <div dangerouslySetInnerHTML={{ __html: question.point3 }} />}
      {question.point4 && <div dangerouslySetInnerHTML={{ __html: question.point4 }} />}
      {question.point5 && <div dangerouslySetInnerHTML={{ __html: question.point5 }} />}
      {question.point6 && <div dangerouslySetInnerHTML={{ __html: question.point6 }} />}
      {question.image && <div dangerouslySetInnerHTML={{ __html: question.image }} />}
    </div>
  );

  return (
    <div className="rosa-questions">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a Topic..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <div className="button-container">
          <button
            className="action-button primary"
            onClick={toggleIndex}
          >
            {showIndex ? 'Hide Index' : 'Show Index'}
          </button>
          <button
            className="action-button secondary"
            onClick={clearSearch}
          >
            Clear Search
          </button>
        </div>
      </div>

      {showIndex && !searchTerm && (
        <div className="questions-list">
          {rosaQuestions.map((question) => (
            <a
              key={question.id}
              href={`#question-${question.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToQuestion(question.id);
              }}
            >
              {question.title}
            </a>
          ))}
        </div>
      )}

      {(showIndex || filteredQuestions.length > 0) && (
        <div className="questions-content">
          {filteredQuestions.length > 0
            ? filteredQuestions.map(renderQuestionContent)
            : rosaQuestions.map(renderQuestionContent)}
        </div>
      )}

      {showScrollTop && (
        <button className="scroll-top-button" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default RosaQuestions; 