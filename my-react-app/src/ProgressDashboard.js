import React from 'react';
import CircularProgressBar from './CircularProgressBar';
import HorizontalProgressBar from './HorizontalProgressBar';

const ProgressDashboard = ({ solvedProblems, totalProblems, solvedEasyProblems, totalEasy, solvedMedProblems, totalMed, solvedHardProblems, totalHard }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
            {/* <h2>Progress Dashboard</h2> */}
            <div style={{ display: 'flex', alignItems: 'center', width: '100%'}}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '70%'}}>
                    <HorizontalProgressBar progress={solvedEasyProblems} total={totalEasy} difficulty="easy" />
                    <HorizontalProgressBar progress={solvedMedProblems} total={totalMed} difficulty="medium" />
                    <HorizontalProgressBar progress={solvedHardProblems} total={totalHard} difficulty="hard" />
                </div>
                <div style={{ marginLeft: '10%' }}>
                    <CircularProgressBar solved={solvedProblems} total={totalProblems} />
                </div>
            </div>
        </div>
    );
};

export default ProgressDashboard;
