import React from "react";
import Progress from "../../components/progress/Progress";
import Right from "./Right.svg";
import Left from "./Left.svg";
import StrokeText from "../../components/stroketext/StrokeText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import "./Gamepage.scss";

export default function Gamepage() {
    return (
        <div className="gamepage-wrapper">
            <div className="logo">
                <img src={Left} alt="" />
                <div className="logo-text">
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
            </div>
            <div className="menu-button">
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
                    <div className="time">
                        <h2></h2>
                    </div>
                    <div className="score">
                        <h3></h3>
                    </div>
                </div>
                <div className="image-wrapper">
                    <div className="image"></div>
                    <div className="map"></div>
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
                <button></button>
            </div>
        </div>
    );
}
