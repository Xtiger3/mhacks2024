import React from 'react';

const HorizontalProgressBar = ({ progress, total, difficulty }) => {
    // Define colors for different difficulty levels
    const colors = {
        easy: '#01B8A3',    // Green for easy
        medium: '#FBBE1E',  // Orange for medium
        hard: '#EB4642',    // Red for hard
    };

    // Set the background color based on the difficulty level
    const backgroundColor = colors[difficulty] || colors.easy;

    // Function to capitalize the first letter of a string
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <div style={{ width: '100%', marginBottom: '10px', display: 'flex', flexDirection: 'row' }}>
            <div style={{ textAlign: 'center', marginBottom: '5px', fontWeight: 'bold', color: '#fff', width: '15em', textAlign: 'left'}}>
                {capitalize(difficulty)} - {progress}/{total}
            </div>
            <div style={{ width: '100%', backgroundColor: '#3D3B6F', border:"solid #DD899D 2px", borderRadius: '5px', overflow: 'hidden', height: '10px' }}>
                <div
                    style={{
                        width: `${(progress / total) * 100}%`,
                        backgroundColor: backgroundColor,
                        height: '100%',
                        transition: 'width 0.8s ease-in-out',
                        borderRadius: '5px', // Make the progress bar's inner part rounded on both sides
                    }}
                />
            </div>
        </div>
    );
};

export default HorizontalProgressBar;
