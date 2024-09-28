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
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h1>Enter your LeetCode Username</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="LeetCode Username"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UsernameInput;
