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
import DiffMap from "../../components/MapDiff";
import Menu from "../../components/menu/Menu";
import GameOver from "../../components/game-over/GameOver";
import { getData, registerGame, submitGuess } from "../../utils/api";
import CountdownTimer from "../../components/timer";

type GamepageProps = {
    handleState: () => void;
};
const tmpRealCoords = {
    lat: 34.414,
    lng: -119.8489,
};

const Gamepage: React.FC<GamepageProps> = ({ handleState }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isGameOverVisible, setIsGameOverVisible] = useState(false);
    const [curLat, setCurLat] = useState(34.412103);
    const [curLng, setCurLng] = useState(-119.853269);
    const [gameCount, setGameCount] = useState(0);
    const [time, setTime] = useState(0);
    const [gameId, setGameId] = useState("invalid");
    const [img, setImg] = useState("");
    const [hack, setHack] = useState(0);
    const [stageScores, setStageScores] = useState([
        null,
        null,
        null,
        null,
        null,
    ]);
    const [stageTimes, setStageTimes] = useState([
        999,
        999,
        999,
        999,
        999,
    ]);
    const [realCoords, setRealCoords] = useState(tmpRealCoords);
    const [reset, setReset] = useState(false);
    const handleLat = (lat: number) => {
        setCurLat(lat);
    };
    const handleLng = (lng: number) => {
        setCurLng(lng);
    };
    const updateTimeElement = (index:any, newValue:any) => {
        setStageTimes((prevArray) => {
          const newArray = [...prevArray]; // Create a copy of the original array
          newArray[index] = newValue; // Update the specific element
          return newArray; // Set the state with the new array
        });
    };
    const handleTime = (time: number) => {
        setTime(time);
        return time;
    };
    const formatTime = (time:any) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };
    
    const progressGame = () => {
        if (gameCount >= 9) {
            setIsGameOverVisible(true);
            //console.log("time1: " + times[0] + " time2: " + times[1] + " time3: " + times[2] + " time4: " + times[3] + " time5: " + times[4]);
            //console.log("time1: " + formatTime(stageTimes[0]) + " time2: " + formatTime(stageTimes[1]) + " time3: " + formatTime(stageTimes[2]) + " time4: " + formatTime(stageTimes[3]) + " time5: " + formatTime(stageTimes[4]))
            //console.log("score1: " + stageScores[0] + " score2: " + stageScores[1] + " score3: " + stageScores[2] + " score4: " + stageScores[3] + " score5: " + stageScores[4]);
        }
        if (gameCount % 2 === 0) {
            const guess = async () => {
                const result = await submitGuess(
                    time,
                    curLat,
                    curLng,
                    gameId,
                    gameCount
                );
                setStageScores(result.scores);
                setStageTimes(result.times);
            };
            guess();
            //updateTimeElement(Math.floor(gameCount/2), time);
            console.log("time before reset: " + time);
            setReset(true);
        } else if (gameCount < 8) {
            setReset(false);
        }
        setGameCount(gameCount + 1);
        console.log(curLat, curLng);
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
    }, [hack]);

    useEffect(() => {
        const getImg = async () => {
            const result = await getData(gameId, Math.floor(gameCount / 2));
            setImg(result.link);
            setStageScores(result.scores);
            setStageTimes(result.times);
            setRealCoords(result.realCoords);
        };
        if (gameId !== "invalid" && gameCount % 2 === 0 && gameCount <= 8) {
            console.log("Calling getImg with gameId", gameId);
            getImg();
        }
    }, [gameId, gameCount]);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };
    const showGameOver = () => {
        setIsGameOverVisible(true);
    };
    return (
        <div className="gamepage-wrapper">
            {isMenuVisible && (
                <Menu handleState={handleState} toggleMenu={toggleMenu} update={()=>{
                    setHack(Math.random());
                    setGameCount(0);
                }} />
            )}
            {isGameOverVisible && (
                <GameOver gameId={gameId} score={stageScores
                                .filter(
                                    (v: number | null): v is number =>
                                        v !== null
                                )
                                .reduce((acc: number, cv: any) => acc + cv, 0)} time={formatTime(stageTimes[0] + stageTimes[1] + stageTimes[2] + stageTimes[3] + stageTimes[4])} handleState={handleState} />
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
                        <CountdownTimer handleTime={handleTime} reset={reset} />
                    </div>
                    <div className="score">
                        <h3>
                            {stageScores
                                .filter(
                                    (v: number | null): v is number =>
                                        v !== null
                                )
                                .reduce((acc: number, cv: any) => acc + cv, 0)}
                        </h3>
                    </div>
                </div>
                <div className="image-wrapper">
                    <div className="image">
                        <Pano
                            key={img}
                            width="100%"
                            height="100%"
                            src={img}
                            title=""
                        />
                    </div>
                    <div className={gameCount % 2 === 0 ? "map" : "map-large"}>
                        {gameCount % 2 === 0 && (
                            <MyMap
                                handleLat={handleLat}
                                handleLng={handleLng}
                            />
                        )}
                        {gameCount % 2 === 1 && (
                            <DiffMap
                                UserMarker={{ lat: curLat, lng: curLng }}
                                realMarker={realCoords}
                                distance={0}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="progress-bar">
                <Progress
                    index={1}
                    score={stageScores[0]}
                    time={formatTime(stageTimes[0])}
                    position="start"
                ></Progress>
                <Progress
                    index={2}
                    score={stageScores[1]}
                    time={formatTime(stageTimes[1])}
                ></Progress>
                <Progress
                    index={3}
                    score={stageScores[2]}
                    time={formatTime(stageTimes[2])}
                ></Progress>
                <Progress
                    index={4}
                    score={stageScores[3]}
                    time={formatTime(stageTimes[3])}
                ></Progress>
                <Progress
                    index={5}
                    score={stageScores[4]}
                    time={formatTime(stageTimes[4])}
                    position="end"
                ></Progress>
            </div>
            <div className="submit-wrapper">
                {gameCount % 2 === 0 ? (
                    <button onClick={progressGame}>
                        <StrokeText
                            text="GUESS"
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
