import React, { useEffect, useState } from "react";
import Progress from "../../components/progress/Progress";
import Right from "./Right.svg";
import Left from "./Left.svg";
import Timer from "./Timer.svg";
import SmallTimer from "./SmallTimer.svg";
import StrokeText from "../../components/stroketext/StrokeText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import "./Gamepage.scss";
import Pano from "../../components/Pano";
import MyMap from "../../components/Map";
import Menu from "../../components/menu/Menu";
import GameOver from "../../components/game-over/GameOver";
import { getLink, registerGame } from "../../utils/api";

type GamepageProps = {
    handleState: () => void;
};

const Gamepage: React.FC<GamepageProps> = ({ handleState }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isGameOverVisible, setIsGameOverVisible] = useState(false);
    const [curLat, setCurLat] = useState(0);
    const [curLng, setCurLng] = useState(0);
    const [gameCount, setGameCount] = useState(0);

    const [gameId, setGameId] = useState(null);
    const [stage, setStage] = useState(0);
    const [img, setImg] = useState("");

    const progressGame = () => {
        if (gameCount >= 8) {
            setIsGameOverVisible(true);
        }
        if (gameCount % 2 === 0) {
            console.log("submitted!");
        } else {
        }
        setGameCount(gameCount + 1);
    };

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();
        const setupGame = async () => {
            const result = await registerGame();
            setGameId(result);
        };
        setupGame();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const getImg = async () => {
            const result = await getLink(gameId, stage);
            setImg(result);
        };
        gameId || getImg();
    }, [gameId]);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };
    const showGameOver = () => {
        setIsGameOverVisible(true);
    };
    return (
        <div className="gamepage-wrapper">
            {isMenuVisible && (
                <Menu handleState={handleState} toggleMenu={toggleMenu} />
            )}
            {isGameOverVisible && (
                <GameOver score={51728} time="7:37" handleState={handleState} />
            )}
            <div className="logo">
                <img src={Left} alt="" />
                <div className="logo-text">
                    <div className="full-logo">
                        <StrokeText
                            text="GAUCHO GUESSR"
                            fontFamily="'Inter', sans-serif"
                            color="#fff"
                            fontSize="25px"
                            fontStyle="italic"
                            fontWeight="900"
                            lineHeight="25px"
                            textAlign="left"
                            shadowColor="#000"
                            xOffset="0px"
                            yOffset="0px"
                            webkitTextStroke="5px black"
                        />
                    </div>
                    <div className="short-logo">
                        <StrokeText
                            text="GG"
                            fontFamily="'Inter', sans-serif"
                            color="#fff"
                            fontSize="30px"
                            fontStyle="italic"
                            fontWeight="900"
                            lineHeight="30px"
                            textAlign="left"
                            shadowColor="#000"
                            xOffset="0px"
                            yOffset="0px"
                            webkitTextStroke="5px black"
                        />
                    </div>
                </div>
            </div>
            <div className="menu-button" onClick={toggleMenu}>
                <img src={Right} alt="" />
                <div className="icon">
                    <FontAwesomeIcon
                        icon={faGear}
                        style={{
                            color: "white",
                            stroke: "black",
                            strokeWidth: "50px",
                            height: 40,
                        }}
                    />
                </div>
            </div>
            <div className="game">
                <div className="timer">
                    <img
                        src={windowWidth < 817 ? SmallTimer : Timer}
                        alt="Timer"
                    />
                    <div className="time">
                        <h2>05:53</h2>
                    </div>
                    <div className="score">
                        <h3>31,415</h3>
                    </div>
                </div>
                <div className="image-wrapper">
                    <div className="image">
                        <Pano width="100%" height="100%" src={img} title="" />
                    </div>
                    <div className={gameCount % 2 === 0 ? "map" : "map large"}>
                        <MyMap />
                    </div>
                </div>
            </div>
            <div className="progress-bar">
                <Progress index={1} position="start"></Progress>
                <Progress index={2}></Progress>
                <Progress index={3}></Progress>
                <Progress index={4}></Progress>
                <Progress index={5} position="end"></Progress>
            </div>
            <div className="submit-wrapper">
                {gameCount % 2 === 0 ? (
                    <button onClick={progressGame}>
                        <StrokeText
                            text="SUBMIT"
                            fontFamily="'Inter', sans-serif"
                            color="#fff"
                            fontSize="25px"
                            fontStyle="italic"
                            fontWeight="900"
                            lineHeight="25px"
                            textAlign="left"
                            shadowColor="#000"
                            xOffset="0px"
                            yOffset="0px"
                            webkitTextStroke="5px black"
                        />
                    </button>
                ) : (
                    <button onClick={progressGame}>
                        <StrokeText
                            text="NEXT"
                            fontFamily="'Inter', sans-serif"
                            color="#fff"
                            fontSize="25px"
                            fontStyle="italic"
                            fontWeight="900"
                            lineHeight="25px"
                            textAlign="left"
                            shadowColor="#000"
                            xOffset="0px"
                            yOffset="0px"
                            webkitTextStroke="5px black"
                        />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Gamepage;
