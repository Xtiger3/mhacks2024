import React from 'react';

function formatString(input) {
    return input.toLowerCase().replace(/\s+/g, '-');
}

const List = ({ title, data }) => {
    return (
        <div style={{ marginBottom: '20px', padding: '20px', paddingBottom: '10px', border: '2px solid #DD899D', borderRadius: '20px', backgroundColor: '#000000', background: 'linear-gradient(to bottom, rgba(55, 36, 40, 0.8), rgba(0, 0, 0, 0.6))' }}>
            <h2 style={{ margin: '0', fontSize: '1.3em', color: '#fff' }}>{title}</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {data.map((submission, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <a href={`https://leetcode.com/problems/${formatString(submission)}`} style={{ textDecoration: 'none' }}>
                            <button style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px 15px',
                                border: 'none',
                                borderRadius: '5px',
                                backgroundColor: '#434380',
                                color: '#EBA98A',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s, transform 0.3s',
                                fontSize: '1em',
                                opacity: '80%',
                                textAlign: 'left'
                            }}
                            className="hover-button"
                            >
                                <strong style={{ marginRight: '10px' }}>{submission}</strong>
                                {/* Arrow SVG */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    style={{ marginLeft: '5px', transition: 'transform 0.3s' }}
                                    className="hover-arrow"
                                >
                                    <path fillRule="evenodd" d="M1.5 8a.5.5 0 0 1 .5-.5h10.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L12.793 8.5H2a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </button>
                        </a>
                    </li>
                ))}
            </ul>
            {/* Add style for hover effect */}
            <style>
                {`
                    .hover-button:hover .hover-arrow {
                        transform: rotate(-45deg);
                    }
                `}
            </style>
        </div>
    );
};

export default List;
