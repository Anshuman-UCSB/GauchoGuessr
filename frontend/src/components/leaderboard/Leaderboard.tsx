import React from "react";


const users = [
    { username: 'User1', score: 120 },
    { username: 'User2', score: 90 },
    { username: 'User3', score: 80 },
    { username: 'User4', score: 70 },
    { username: 'User5', score: 60 },
    { username: 'User6', score: 50 },
    { username: 'User7', score: 40 },
    { username: 'User8', score: 300 },
    { username: 'User9', score: 20 },
    { username: 'User10', score: 10 },
  ];
//Eventually pass in all users and scores as props
export default function Leaderboard() {
    // Sort the data based on scores in descending order

    const sortedData = users.sort((a, b) => b.score - a.score);
    
    // Take the top 5 entries
    const top5 = sortedData.slice(0, 5);
    
    return (
      <div>
        <h2>Leaderboard</h2>
        <ol>
          {top5.map((user, index) => (
            <li key={user.username}>
               {user.username} - {user.score} points
            </li>
          ))}
        </ol>
      </div>
    );

}
