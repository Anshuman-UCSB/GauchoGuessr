import React from "react";
import StrokeText from "../stroketext/StrokeText";
import "./Leaderboard.scss";

interface UserScore {
    name: string;
    score: number;
}

interface LeaderboardProps {
    usersScores: UserScore[];
}

export default function Leaderboard({ usersScores }: LeaderboardProps) {
    // Function to calculate the number of dots needed based on text length
    const calculateDots = (name: string, score: number) => {
        const maxLength = 40; // Adjust this based on your layout width
        const currentLength = name.length + score.toString().length;
        return ".".repeat(maxLength - currentLength);
    };
    // TODO: leaderboard connected to API
    return (
        <div className="leaderboard-container">
            <StrokeText
                text="LEADERBOARD"
                fontFamily="'Inter', sans-serif"
                color="#fff"
                fontSize="37px"
                fontStyle="italic"
                fontWeight="900"
                lineHeight="50px"
                textAlign="center"
                shadowColor="#000"
                xOffset="-2px"
                yOffset="2px"
                webkitTextStroke="5px black"
            />
            <div className="user-list">
                {usersScores.map((userScore, index) => (
                    <div key={index} className="user-score">
                        <span className="username">{userScore.name}</span>
                        <span className="dots">
                            {calculateDots(userScore.name, userScore.score)}
                        </span>
                        <span className="score">
                            {userScore.score.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
