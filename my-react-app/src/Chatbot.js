import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = ({ solvedEasyProblems, solvedMedProblems, solvedHardProblems, numDaysLast }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const username = localStorage.getItem('leetcodeUsername');

    const sendMessage = async () => {
        if (input.trim() === '') return;

        // Prepare new user message
        const newMessage = { sender: 'user', text: input };
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        setInput('');

        // Prepare LeetCode stats as an object
        const leetcodeStats = {
            easy: solvedEasyProblems,
            medium: solvedMedProblems,
            hard: solvedHardProblems,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/chat', {
                messages: updatedMessages.filter(msg => msg.text), // Filter out any messages without text
                leetcodeStats: leetcodeStats,
                username: username,
                numDaysLast: numDaysLast,
            });
            const botReply = response.data.response;

            // Update the state with the bot's reply
            setMessages([...updatedMessages, { sender: 'bot', text: botReply }]);
        } catch (error) {
            console.error('Error getting chatbot response:', error);
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', width: '400px' }}>
            <h2>Chatbot</h2>
            <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: 'calc(100% - 60px)', marginRight: '10px' }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chatbot;
