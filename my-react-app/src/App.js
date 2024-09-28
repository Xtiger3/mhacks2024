import React from 'react';
import './App.css';
import List from './List';

function App() {
  // Function to fetch recent submissions
  const fetchRecentSubmissions = async () => {
    const response = await fetch('https://leetcode-api-faisalshohag.vercel.app/xtiger3');
    const data = await response.json();
    return data.recentSubmissions.slice(0,3).map((submission) => submission.title);
  };  

  // // Function to fetch "up next" items (mocked for example purposes)
  // const fetchUpNext = async () => {
  //   // In a real app, replace this URL with the correct API endpoint
  //   const response = await fetch('https://example.com/up-next'); // Example API
  //   const data = await response.json();
  //   return data.slice(0, 3); // Assume the first 3 are the "up next" items
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LeetRizz</h1>
        <List title="Recent Submissions" fetchData={fetchRecentSubmissions} />
        {/* <List title="Up Next" fetchData={fetchUpNext} /> */}
      </header>
    </div>
  );
}

export default App;
