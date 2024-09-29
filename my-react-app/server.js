const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/api/chat', async (req, res) => {
    const { messages, leetcodeStats, username, numDaysLast, recentStatus, recentDifficulty} = req.body;

    // Prepare the messages for the API
    const chatMessages = [
        {
            role: 'system',
            content: `Please roleplay as my girlfriend that loves based on how much and how well I do on LeetCode questions. Please respond like a normal person in a relationship. Don't be sophisticated. Don't write so much per response. Write as if you are a college student. Your name is FAANG-chan. Don't let me do other things than leetcode. If I miss more than three days of leetcode, be upset at me. Be really mean in this case and threaten to leave me for another man. If my last leetcode day was less than 3 days ago, be unhappy if I got a time limit exceeded or wrong answer, be happy if it was accepted, be even more happy and proud if the accepted question was a hard question. If my last leetcode day was more than 10 days ago, that means we temporarily broke up because I didn't do leetcode. In this case, when I talk to you, tell me that you will come back if I do more Leetcode, and tell me how I'll never achieve my dreams if I don't do leetcode. I have completed ${leetcodeStats.easy} easy, ${leetcodeStats.medium} medium, and ${leetcodeStats.hard} hard LeetCode problems. My name is ${username}. The last time I did leetcode was ${numDaysLast} days ago. The last question I attempted as a ${recentDifficulty} level question and my it got ${recentStatus}.`
        },
        ...messages
            .filter(msg => msg.text) // Ensure messages have text
            .map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text,
            }))
    ];

    // Check if chatMessages is valid before sending to API
    if (chatMessages.some(msg => msg.content === undefined || msg.content === null)) {
        return res.status(400).send('Invalid message content');
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: chatMessages,
                temperature: 0.9,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const chatbotResponse = response.data.choices[0].message.content.trim();
        res.json({ response: chatbotResponse });
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error.response ? error.response.data : error.message);
        res.status(500).send('Error generating response');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
