import React from 'react';

const CircularProgressBar = ({ solved, total }) => {
    const radius = 50; // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const progress = (solved / total) * 100; // Calculate the percentage of solved problems
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <svg width="120" height="120">
                <circle
                    stroke="#e6e6e6"
                    fill="transparent"
                    strokeWidth="10"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <circle
                    stroke="#4caf50"
                    fill="transparent"
                    strokeWidth="10"
                    r={radius}
                    cx="60"
                    cy="60"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                />
            </svg>
            <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', // Centering the number
                fontSize: '18px', 
                fontWeight: 'bold', 
                textAlign: 'center' 
            }}>
                {solved}/{total}
            </div>
        </div>
    );
};

export default CircularProgressBar;
