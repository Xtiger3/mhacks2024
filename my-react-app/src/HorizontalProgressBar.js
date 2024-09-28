import React from 'react';

const HorizontalProgressBar = ({ progress, total, difficulty }) => {
    // Define colors for different difficulty levels
    const colors = {
        easy: '#4caf50',    // Green for easy
        medium: '#ff9800',  // Orange for medium
        hard: '#f44336',    // Red for hard
    };

    // Set the background color based on the difficulty level
    const backgroundColor = colors[difficulty] || colors.easy;

    // Function to capitalize the first letter of a string
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <div style={{ width: '100%', marginBottom: '10px' }}>
            <div style={{ textAlign: 'center', marginBottom: '5px', fontWeight: 'bold' }}>
                {capitalize(difficulty)} - {progress}/{total}
            </div>
            <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', height: '10px' }}>
                <div
                    style={{
                        width: `${(progress / total) * 100}%`,
                        backgroundColor: backgroundColor,
                        height: '100%',
                        transition: 'width 0.8s ease-in-out',
                    }}
                />
            </div>
        </div>
    );
};

export default HorizontalProgressBar;
