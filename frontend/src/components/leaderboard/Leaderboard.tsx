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
            <ol className="user-list">
                {usersScores.map((userScore, index) => (
                    <li key={index} className="user-score">
                        <div className="wrapper">
                            <span className="username">{userScore.name}</span>
                            <span className="score">
                                {userScore.score.toLocaleString()}
                            </span>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
