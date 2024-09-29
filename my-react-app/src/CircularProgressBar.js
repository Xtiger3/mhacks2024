import React, { useEffect, useState } from 'react';

const CircularProgressBar = ({ solved = 0, total = 1 }) => {
    const radius = 50; // Radius of the circle
    const circumference = 2 * Math.PI * radius;

    // State for animated progress
    const [progress, setProgress] = useState(0);

    // Calculate the stroke offset based on the current progress
    const offset = circumference - (progress / total) * circumference;

    useEffect(() => {
        // Prevent NaN issues and ensure total is not zero
        if (total === 0) return;

        const animateProgress = () => {
            const duration = 1000; // Duration of the animation in milliseconds
            const start = 0; // Starting progress
            const end = solved; // Ending progress
            const startTime = performance.now(); // Record the start time

            const step = (currentTime) => {
                const elapsed = currentTime - startTime; // Calculate elapsed time
                const progressFraction = Math.min(elapsed / duration, 1); // Calculate the progress fraction
                const currentProgress = Math.round(start + (end - start) * progressFraction); // Interpolate the progress

                setProgress(currentProgress); // Update progress state

                if (progressFraction < 1) {
                    requestAnimationFrame(step); // Request the next animation frame
                }
            };

            requestAnimationFrame(step); // Start the animation
        };

        animateProgress(); // Start the animation when solved or total changes
    }, [solved, total]); // Re-run if solved or total changes

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '120px', width: '120px' }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
            {/* Define a filter for the glow effect */}
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {/* Outer glowing circle */}
            <circle
                stroke="#EAAB87"
                fill="transparent"
                strokeWidth="10"
                r={radius + 3} // Increase radius for the outer circle
                cx="60" // Center at half of 160 (width)
                cy="60" // Center at half of 160 (height)
                filter="url(#glow)" // Apply the glow filter here
            />
            {/* Background circle (gray) */}
            <circle
                stroke="#EAAB87"
                fill="#FCFAED"
                strokeWidth="3"
                r={radius}
                cx="60" // Center at half of 160 (width)
                cy="60" // Center at half of 160 (height)
            />
            {/* Animated progress circle (green) */}
            <circle
                stroke="#8875C5"
                fill="transparent"
                strokeWidth="3"
                r={radius}
                cx="60" // Center at half of 160 (width)
                cy="60" // Center at half of 160 (height)
                strokeDasharray={circumference}
                strokeDashoffset={circumference} // Start with a full offset (no green)
                style={{
                    transition: 'stroke-dashoffset 0.5s ease-in-out',
                    strokeDashoffset: offset, // Change the strokeDashoffset during animation
                }}
            />
        </svg>
        <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', // Centering the number
            fontSize: '18px', 
            fontWeight: 'bold', 
            textAlign: 'center',
            margin: '0'
        }}>
            <p style={{ fontSize: "24px", margin: '0' }}>{`${progress}`}</p> {/* Display rounded progress */}
            <p style={{ margin: '0' }}>solved</p>
        </div>
    </div>
    

    );
};

export default CircularProgressBar;
