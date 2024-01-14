import React, { useEffect, useState } from "react";
import "./GameOver.scss";
import TopPoly from "./TopPoly.svg";
import StrokeText from "../stroketext/StrokeText";
import DOMPurify from "dompurify";
import Filter from "bad-words";
import { getPosition, submitLeaderboard } from "../../utils/api";
import ConfettiExplosion from "react-confetti-explosion";
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
    const [copied, setCopied] = useState(false);
    const [position, setPosition] = useState("");
    const [leaderboardState, setLeaderboardState] = useState("unsubmitted");

    const [explode, setExplode] = useState(false);

    useEffect(() => {
        setExplode(true);

        // Optionally reset the explosion after a set duration
        const timer = setTimeout(() => {
            setExplode(false);
        }, 2000); // Adjust the duration to match the confetti animation

        // Cleanup the timer
        return () => clearTimeout(timer);
    }, []); // The empty array ensures this effect runs only once on mount

    useEffect(() => {
        const getPos = async () => {
            const result = await getPosition(score);
            setPosition(result.position);
        };
        getPos();
    }, []);

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
        if (username.length > 0 && username.length <= 10) {
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
            alert("Username must be between 1 and 10 characters");
        }
    };

    const handleShareClick = () => {
        // Here you would handle the share functionality
        const shareText = `${username} just scored ${score} on GauchoGuessr.com!`;

        // Copy the text to the clipboard
        navigator.clipboard
            .writeText(shareText)
            .then(() => {
                setCopied(true);
            })
            .catch((err) => {
                console.error("Failed to copy text to clipboard", err);
            });
    };

    return (
        <div className="game-over">
            <div className="game-over-box">
                {explode && (
                    <ConfettiExplosion
                        force={0.8}
                        duration={3000}
                        particleCount={250}
                        width={1600}
                    />
                )}
                <div className="stats">
                    <img src={TopPoly} alt="" />
                    <h1>{score}</h1>
                    <div className="sub-stats">
                        <h2>{position}</h2>
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
                                text={copied ? "COPIED!" : "SHARE"}
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
