// UsernameInput.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsernameInput = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('leetcodeUsername', username);
        navigate('/main'); // Navigate to the main page
    };

    return (
        <div className="login-container" style={{ backgroundColor: "#1C254E" }}>
            {/* <h1>LeetRizz</h1> */}
            <img src="/logo.png" style={{width:'20%'}}/>
            <p className="login-prompt">Enter your LeetCode username</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="LeetCode Username"
                    required
                />
            </form>
        </div>
        
    );
};

export default UsernameInput;
