import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './App.css';
import QuestionSearch from './QuestionSearch';
import RosaPage from './pages/RosaPage';

function App() {
  return (
    <Router basename="/muleinterview">
      <div className="app">
        <nav>
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/rosa">ROSA Questions</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<QuestionSearch />} />
          <Route path="/rosa" element={<RosaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;