import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import QuestionSearch from './QuestionSearch';
import RosaPage from './pages/RosaPage';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <NavLink to="/" end>Home</NavLink>
            </li>
            <li>
              <NavLink to="/rosa">ROSA</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<QuestionSearch />} />
          <Route path="/rosa" element={<RosaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;