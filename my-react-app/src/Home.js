// Home.js
import React, { useEffect, useState } from 'react';
import List from './List';
import ProgressDashboard from './ProgressDashboard'; // Import the new component

const Home = () => {
    const [recentSubmissions, setRecentSubmissions] = useState([]);
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

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch('https://leetcode-api-faisalshohag.vercel.app/' + username);
                const data = await response.json();
                
                setRecentSubmissions(data.recentSubmissions.slice(0, 3));
                setSolvedProblems(data.totalSolved);
                setTotalProblems(data.totalQuestions);
                setSolvedEasyProblems(data.easySolved);
                setSolvedMedProblems(data.mediumSolved);
                setSolvedHardProblems(data.hardSolved);
                setTotalEasy(data.totalEasy);
                setTotalMed(data.totalMedium);
                setTotalHard(data.totalHard);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchSubmissions();
    }, [username]);

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <h1>Welcome, {username}!</h1>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <div style={{ flex: '1', marginRight: '10px' }}> {/* List takes up 50% */}
                    <List title="Recent Submissions" data={recentSubmissions} />
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
