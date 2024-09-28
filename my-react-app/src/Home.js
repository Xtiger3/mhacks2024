// Home.js
import React, { useEffect, useState } from 'react';
import List from './List';
import ProgressDashboard from './ProgressDashboard'; // Import the new component
import './App.css';
import Papa from 'papaparse';


const Home = () => {
    const [recentSubmissions, setRecentSubmissions] = useState([]);
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
    const username = localStorage.getItem('leetcodeUsername');

    

    const getSimilarQuestions = async () => {
        const similarQuestionsSet = new Set();
        Papa.parse('/problems.csv', {
            download: true,
            header: true,
            complete: (results) => {
                results.data.forEach((row) => {
                    if (row.title !== undefined) {
                        let title = (row.title).split('. ')[1]
                        if (recentSubmissions.includes(title)) {
                            // const parsedArray = JSON.parse(row.similar_questions.replace(/""/g, '"')); // Replaces the double quotes with single ones
                            const trimmedString = row.similar_questions.replace(/[\[\]'"]/g, '');
                            const questions = trimmedString.split(',');
                            questions.forEach((question) => {
                            similarQuestionsSet.add(question.trim());
                            });
                        }
                    }
                            
                });
    
                // Get the top 3 unique similar questions and resolve the promise
                setSimilarQuestions(Array.from(similarQuestionsSet).slice(0, 3));
            },
        });
    }

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch('https://leetcode-api-faisalshohag.vercel.app/' + username);
                const data = await response.json();
                const uniqueTitles = new Set(data.recentSubmissions.map((submission) => submission.title));
                const submissionTitles = Array.from(uniqueTitles).slice(0, 3);
                setRecentSubmissions(submissionTitles);
                setSolvedProblems(data.totalSolved);
                setTotalProblems(data.totalQuestions);
                setSolvedEasyProblems(data.easySolved);
                setSolvedMedProblems(data.mediumSolved);
                setSolvedHardProblems(data.hardSolved);
                setTotalEasy(data.totalEasy);
                setTotalMed(data.totalMedium);
                setTotalHard(data.totalHard);

                const similarQuestionsSet = new Set();
                Papa.parse('/problems.csv', {
                    download: true,
                    header: true,
                    complete: (results) => {
                        results.data.forEach((row) => {
                            if (row.title !== undefined) {
                                let title = (row.title).split('. ')[1]
                                if (submissionTitles.includes(title)) {
                                    // const parsedArray = JSON.parse(row.similar_questions.replace(/""/g, '"')); // Replaces the double quotes with single ones
                                    const trimmedString = row.similar_questions.replace(/[\[\]'"]/g, '');
                                    const questions = trimmedString.split(',');
                                    questions.forEach((question) => {
                                    similarQuestionsSet.add(question.trim());
                                    });
                                }
                            }
                                    
                        });
            
                        // Get the top 3 unique similar questions and resolve the promise
                        setSimilarQuestions(Array.from(similarQuestionsSet).slice(0, 3));
                    },
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchSubmissions();
        // getSimilarQuestions();
    }, [username]);

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <h1>Welcome, {username}!</h1>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <div style={{ flex: '1', marginRight: '10px' }}> {/* List takes up 50% */}
                    <List title="Recent Submissions" data={recentSubmissions} />
                    <List title="Up Next" data={similarQuestions} />
                </div>
                <div style={{ flex: '1', marginLeft: '10px' }}> {/* ProgressDashboard takes up 50% */}
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
                </div>
            </div>
        </div>
    );
};

export default Home;
