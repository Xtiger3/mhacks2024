// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsernameInput from './UsernameInput'; // Assuming you have this component
import Home from './Home'; // Updated import
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UsernameInput />} />
                <Route path="/main" element={<Home />} /> {/* Updated to Home */}
            </Routes>
        </Router>
    );
};

export default App;
