import React from "react";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import "./Homepage.scss";
import {Link} from "react-router-dom";

export default function Homepage() {
    return (
        <div className="homepage">
            <div className="start">
                <h1>GUACHO GUESSR</h1>
                <Link to="/game">
                    <button>Start</button>
                </Link>
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
