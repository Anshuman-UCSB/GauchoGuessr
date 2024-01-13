import React from "react";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import StrokeText from "../../components/stroketext/StrokeText";
import "./Homepage.scss";

export default function Homepage() {
    return (
        <div className="homepage">
            <div className="start">
                <StrokeText
                    text="GAUCHO GUESSR"
                    fontFamily="'Inter', sans-serif"
                    color="#fff"
                    fontSize="150px"
                    fontStyle="italic"
                    fontWeight="900"
                    lineHeight="140px"
                    textAlign="center"
                    shadowColor="#000"
                    xOffset="-4px"
                    yOffset="4px"
                    webkitTextStroke="10px black"
                />
                <button>
                    <StrokeText
                        text="START!"
                        fontFamily="'Inter', sans-serif"
                        color="#fff"
                        fontSize="100px"
                        fontStyle="italic"
                        fontWeight="900"
                        lineHeight="normal"
                        textAlign="center"
                        shadowColor="#000"
                        xOffset="-4px"
                        yOffset="4px"
                        webkitTextStroke="5px black"
                    />
                </button>
                <p>
                    How well do you know UCSB’s campus? Guess your location to
                    earn points, and see if you can top the leaderboard!
                </p>
            </div>
            <div className="leaderboard">
                <Leaderboard></Leaderboard>
            </div>
        </div>
    );
}
