import React, { useState } from "react";
import "./GameOver.scss";
import TopPoly from "./TopPoly.svg";
import StrokeText from "../stroketext/StrokeText";
interface GameOverProps {
    score: number;
    time: string;
    handleState: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, time, handleState }) => {
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
                            <button onClick={handleEnterClick}>
                                <StrokeText
                                    text="ENTER"
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
