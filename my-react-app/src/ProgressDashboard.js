import React from 'react';
import CircularProgressBar from './CircularProgressBar';
import HorizontalProgressBar from './HorizontalProgressBar';

const ProgressDashboard = ({ solvedProblems, totalProblems, solvedEasyProblems, totalEasy, solvedMedProblems, totalMed, solvedHardProblems, totalHard }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%'}}>
            <div style={{ marginRight: '20px' }}>
                <CircularProgressBar solved={solvedProblems} total={totalProblems} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50%'}}>
                <HorizontalProgressBar progress={solvedEasyProblems} total={totalEasy} difficulty="easy" />
                <HorizontalProgressBar progress={solvedMedProblems} total={totalMed} difficulty="medium" />
                <HorizontalProgressBar progress={solvedHardProblems} total={totalHard} difficulty="hard" />
            </div>
        </div>
    );
};

export default ProgressDashboard;
