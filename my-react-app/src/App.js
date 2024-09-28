import React, { useState } from 'react';
import './App.css';
import List from './List';

function App() {
  const [submissions, setSubmissions] = useState([
    'Submission 1',
    'Submission 2',
    'Submission 3',
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>LeetRizz</h1>
        <List title="Up Next" submissions={submissions} />
        <List title="Recent Submissions" submissions={submissions} />
      </header>
    </div>
  );
}

export default App;
