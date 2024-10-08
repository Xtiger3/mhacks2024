// Home.js
import React, { useEffect, useState } from 'react';
import List from './List';
import ProgressDashboard from './ProgressDashboard'; 
import Chatbot from './Chatbot';
import './App.css';
import Papa from 'papaparse';


const Home = () => {
    const [recentSubmissions, setRecentSubmissions] = useState([]);
    const [recentStatus, setRecentStatus] = useState("");
    const [recentDifficulty, setRecentDifficulty] = useState("");
    const [similarQuestions, setSimilarQuestions] = useState([]);
    const [upNext, setUpNext] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState(0);
    const [totalProblems, setTotalProblems] = useState(0);
    const [solvedEasyProblems, setSolvedEasyProblems] = useState(0);
    const [solvedMedProblems, setSolvedMedProblems] = useState(0);
    const [solvedHardProblems, setSolvedHardProblems] = useState(0);
    const [totalEasy, setTotalEasy] = useState(0);
    const [totalMed, setTotalMed] = useState(0);
    const [totalHard, setTotalHard] = useState(0);
    const [numDaysSinceLast, setNumDaysSinceLast] = useState(0);
    const username = localStorage.getItem('leetcodeUsername');

    const daysAgo = (timestamp) => {
        const now = Date.now();
        const timestampInMs = timestamp * 1000; // Convert to milliseconds
        const differenceInMs = now - timestampInMs;
        return Math.floor(differenceInMs / (1000 * 60 * 60 * 24)); // Convert to days
    };

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch('https://leetcode-api-faisalshohag.vercel.app/' + username);
                const data = await response.json();
                const uniqueTitles = new Set(data.recentSubmissions.map((submission) => submission.title));
                const submissionTitles = Array.from(uniqueTitles).slice(0, 3);
                setRecentSubmissions(submissionTitles);
                setRecentStatus(data.recentSubmissions[0].statusDisplay);
                setSolvedProblems(data.totalSolved);
                setTotalProblems(data.totalQuestions);
                setSolvedEasyProblems(data.easySolved);
                setSolvedMedProblems(data.mediumSolved);
                setSolvedHardProblems(data.hardSolved);
                setTotalEasy(data.totalEasy);
                setTotalMed(data.totalMedium);
                setTotalHard(data.totalHard);
            
                // get similar questions
                const similarQuestionsSet = new Set();
                Papa.parse('/problems.csv', {
                    download: true,
                    header: true,
                    complete: (results) => {
                        results.data.forEach((row) => {
                            if (row.title !== undefined) {
                                let title = (row.title).split('. ')[1]
                                if (submissionTitles.includes(title)) {
                                    const trimmedString = row.similar_questions.replace(/[\[\]'"]/g, '');
                                    const questions = trimmedString.split(',');
                                    questions.forEach((question) => {
                                        if (question !== "")
                                            similarQuestionsSet.add(question.trim());
                                    });
                                }
                                if (title === submissionTitles[0]) {
                                    setRecentDifficulty(row.difficulty)
                                }
                            }
                        });
                        // Get the top 3 unique similar questions and resolve the promise
                        setSimilarQuestions(Array.from(similarQuestionsSet).slice(0, 3));
                    },
                });
                if (data.recentSubmissions.length > 0) {
                    setNumDaysSinceLast(daysAgo(data.recentSubmissions[0].timestamp));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchSubmissions();
    // getSimilarQuestions();
    }, [username]);

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 'auto', backgroundColor: '#1C254E', height:'100vh', overflowY :'hidden'}}>
            <h1>Welcome, {username}!</h1>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                <div style={{ flex: '1', marginRight: '10px' }}>
                    {/* <p>last submitted {numDaysSinceLast} days ago</p> */}
                    <List title="Next Recommended Problems" data={similarQuestions} />
                    <List title="Recent Submissions" data={recentSubmissions} />
                </div>
                <div style={{ flex: '2', marginLeft: '10px', flexDirection:'column', display: 'flex'}}> 
                    <ProgressDashboard 
                        solvedProblems={solvedProblems}
                        totalProblems={totalProblems}
                        solvedEasyProblems={solvedEasyProblems}
                        totalEasy={totalEasy}
                        solvedMedProblems={solvedMedProblems}
                        totalMed={totalMed}
                        solvedHardProblems={solvedHardProblems}
                        totalHard={totalHard}
                    />
                    <Chatbot
                        solvedEasyProblems={solvedEasyProblems}
                        solvedMedProblems={solvedMedProblems}
                        solvedHardProblems={solvedHardProblems}
                        numDaysLast={numDaysSinceLast}
                        recentStatus={recentStatus}
                        recentDifficulty={recentDifficulty}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
