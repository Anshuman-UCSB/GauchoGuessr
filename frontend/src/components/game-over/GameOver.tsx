import React, { useState } from "react";
import "./GameOver.scss";
import TopPoly from "./TopPoly.svg";
import StrokeText from "../stroketext/StrokeText";
import DOMPurify from "dompurify";
import Filter from "bad-words";
import { submitLeaderboard } from "../../utils/api";
interface GameOverProps {
    score: number;
    time: string;
    gameId: string;
    handleState: () => void;
}

const filter = new Filter();

const GameOver: React.FC<GameOverProps> = ({
    score,
    time,
    handleState,
    gameId,
}) => {
    const [username, setUsername] = useState("");
    const [leaderboardState, setLeaderboardState] = useState("unsubmitted");

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const input = event.target.value;
        if (input) {
            // Check if the input is not null or undefined
            setUsername(input);
        } else {
            setUsername(""); // Or handle as appropriate for your application
        }
    };

    const handleEnterClick = async () => {
        if (username.length > 0 && username.length < 30) {
            const cleanInput = DOMPurify.sanitize(username);
            const filteredInput = filter.clean(cleanInput);
            try {
                setLeaderboardState("submitting");
                await submitLeaderboard(gameId, filteredInput);
                setLeaderboardState("submitted");
            } catch (error) {
                setLeaderboardState("error");
                console.log(leaderboardState, error);
            }
        } else {
            alert("Username must be between 1 and 30 characters");
        }
    };

    const handleShareClick = () => {
        // Here you would handle the share functionality
        console.log("Share button clicked");
    };

    return (
        <div className="game-over">
            <div className="game-over-box">
                <div className="stats">
                    <img src={TopPoly} alt="" />
                    <h1>{score}</h1>
                    <div className="sub-stats">
                        <h2>7th</h2>
                        <h2>{time}</h2>
                    </div>
                </div>
                <div className="actions">
                    <div>
                        <label htmlFor="username-input">Add A Username!</label>
                        <input
                            id="username-input"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <div className="wrapper">
                            {leaderboardState === "unsubmitted" && (
                                <button onClick={handleEnterClick}>
                                    <StrokeText
                                        text="SUBMIT"
                                        fontFamily="'Inter', sans-serif"
                                        color="#fff"
                                        fontSize="20px"
                                        fontStyle="italic"
                                        fontWeight="900"
                                        lineHeight="20x"
                                        textAlign="left"
                                        shadowColor="#000"
                                        xOffset="0px"
                                        yOffset="0px"
                                        webkitTextStroke="5px black"
                                    />
                                </button>
                            )}
                            {leaderboardState === "submitted" && (
                                <div className="wrapper">
                                    <StrokeText
                                        text="SUBMITTED!"
                                        fontFamily="'Inter', sans-serif"
                                        color="#fff"
                                        fontSize="20px"
                                        fontStyle="italic"
                                        fontWeight="900"
                                        lineHeight="25x"
                                        textAlign="left"
                                        shadowColor="#000"
                                        xOffset="0px"
                                        yOffset="0px"
                                        webkitTextStroke="5px black"
                                    />
                                </div>
                            )}
                            {leaderboardState === "error" && (
                                <div className="wrapper-2">
                                    <button onClick={handleEnterClick}>
                                        <StrokeText
                                            text="SUBMIT"
                                            fontFamily="'Inter', sans-serif"
                                            color="#fff"
                                            fontSize="20px"
                                            fontStyle="italic"
                                            fontWeight="900"
                                            lineHeight="20x"
                                            textAlign="left"
                                            shadowColor="#000"
                                            xOffset="0px"
                                            yOffset="0px"
                                            webkitTextStroke="5px black"
                                        />
                                    </button>
                                    <StrokeText
                                        text="Error please try again!"
                                        fontFamily="'Inter', sans-serif"
                                        color="#fff"
                                        fontSize="15px"
                                        fontStyle="italic"
                                        fontWeight="900"
                                        lineHeight="15x"
                                        textAlign="left"
                                        shadowColor="#000"
                                        xOffset="0px"
                                        yOffset="0px"
                                        webkitTextStroke="5px black"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="another-wrapper">
                        <button className="share" onClick={handleShareClick}>
                            <StrokeText
                                text="SHARE"
                                fontFamily="'Inter', sans-serif"
                                color="#fff"
                                fontSize="20px"
                                fontStyle="italic"
                                fontWeight="900"
                                lineHeight="20x"
                                textAlign="left"
                                shadowColor="#000"
                                xOffset="0px"
                                yOffset="0px"
                                webkitTextStroke="5px black"
                            />
                        </button>
                        <button className="home" onClick={handleState}>
                            <StrokeText
                                text="HOME"
                                fontFamily="'Inter', sans-serif"
                                color="#fff"
                                fontSize="20px"
                                fontStyle="italic"
                                fontWeight="900"
                                lineHeight="20x"
                                textAlign="left"
                                shadowColor="#000"
                                xOffset="0px"
                                yOffset="0px"
                                webkitTextStroke="5px black"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameOver;
