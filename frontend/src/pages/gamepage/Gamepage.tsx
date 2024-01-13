import React from "react";
import Progress from "../../components/progress/Progress";

export default function Gamepage() {
    return (
        <div>
            <div className="logo"></div>
            <div className="menu-button"></div>
            <div className="game">
                <div className="timer">
                    <div className="time"></div>
                    <div className="score"></div>
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
