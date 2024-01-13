import React from "react";
import StrokeText from "../stroketext/StrokeText";
import "./Leaderboard.scss";

export default function Leaderboard() {
    return (
        <div>
            <StrokeText
                text="LEADERBOARD"
                fontFamily="'Inter', sans-serif"
                color="#fff"
                fontSize="40px"
                fontStyle="italic"
                fontWeight="900"
                lineHeight="50px"
                textAlign="center"
                shadowColor="#000"
                xOffset="-2px"
                yOffset="2px"
                webkitTextStroke="5px black"
            />
        </div>
    );
}
