import React from 'react';

const List = ({ title, submissions }) => {
    return (
      <div className="recent-submissions">
        <h2>{title}</h2>
        <ul>
          {submissions.length > 0 ? (
            submissions.map((submission, index) => (
              <li key={index}>{submission}</li>
            ))
          ) : (
            <li>No recent submissions</li>
          )}
        </ul>
      </div>
    );
  };

export default List;
