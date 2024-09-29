import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chatbot = ({ solvedEasyProblems, solvedMedProblems, solvedHardProblems, numDaysLast }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const username = localStorage.getItem('leetcodeUsername');
    const messagesEndRef = useRef(null); // Create a ref for the message container

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
                messages: updatedMessages.filter((msg) => msg.text), // Filter out any messages without text
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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', justifyItems: 'right', width: '100%' }}>
                <div style={{ flex: '5' }}>
                    <img src='/pleased-faang.GIF' style={{width:'100%'}}/>
                </div>
                <div
                    style={{
                        width: '400px',
                        height: '400px',
                        overflowY: 'auto',
                        marginBottom: '15px',
                        padding: '10px',
                        borderRadius: '10px',
                        flex: '4'
                    }}
                >
                    <style>
                        {`
                            div::-webkit-scrollbar {
                                display: none; /* For Chrome, Safari, and Opera */
                            }
                            @keyframes fadeIn {
                                0% { opacity: 0; }
                                100% { opacity: 1; }
                            }
                        `}
                    </style>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                textAlign: msg.sender === 'user' ? 'right' : 'left',
                                animation: 'fadeIn 0.5s ease-in-out',
                                margin: '10px 0',
                            }}
                        >
                            <div
                                style={{
                                    display: 'inline-block',
                                    padding: '10px 15px',
                                    borderRadius: '20px',
                                    backgroundColor: msg.sender === 'user' ? '#434380' : '#e0e0e0',
                                    color: msg.sender === 'user' ? '#EBA98A' : '#000',
                                    maxWidth: '75%',
                                    wordWrap: 'break-word',
                                }}
                            >
                                <strong>{msg.sender === 'user' ? 'You' : 'FAANG-chan'}:</strong> {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Empty div to mark the end of messages */}
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'right', width: '100%' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    style={{
                        flex: '1',
                        padding: '10px',
                        borderRadius: '20px',
                        border: '1px solid #ccc',
                        outline: 'none',
                        marginRight: '10px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        background: 'linear-gradient(to left, rgba(55, 36, 40, 0.8), rgba(0, 0, 0, 0.6))',
                        color: 'white'
                    }}
                />
                <button
                    onClick={sendMessage}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '20px',
                        border: 'none',
                        backgroundColor: '#434380',
                        color: '#EBA98A',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
