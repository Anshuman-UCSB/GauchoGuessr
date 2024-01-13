import React, { useState } from "react";

interface GameOverProps {
    score: number;
    time: string;
}

export default function GameOver({ score, time }: GameOverProps) {
    const [username, setUsername] = useState("");

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value);
    };

    const handleEnterClick = () => {
        // Here you would typically handle the username submission
        console.log("Username entered:", username);
    };

    const handleShareClick = () => {
        // Here you would handle the share functionality
        console.log("Share button clicked");
    };

    const handleHomeClick = () => {
        // Here you would handle navigation to the home screen
        console.log("Home button clicked");
    };

    return (
        <div>
            <h2>score.toLocaleString()</h2>
            <h2>position here</h2>
            <h2>time</h2>
            <div>
                <label htmlFor="username-input">Add A Username!</label>
                <input
                    id="username-input"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <button onClick={handleEnterClick}>ENTER</button>
            </div>
            <div>
                <button onClick={handleShareClick}>SHARE</button>
                <button onClick={handleHomeClick}>HOME</button>
            </div>
        </div>
    );
}
