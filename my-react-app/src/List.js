// List.js
import React from 'react';

const List = ({ title, data }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <h2>{title}</h2>
            <ul>
                {data.map((submission, index) => (
                    <li key={index}>
                        <strong>{submission}</strong>
                        {/* If you have a statusDisplay, uncomment the line below */}
                        {/* - {submission.statusDisplay} */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
