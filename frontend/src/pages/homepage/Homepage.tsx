import React from "react";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import StrokeText from "../../components/stroketext/StrokeText";
import "./Homepage.scss";

type UserScore = {
    username: string;
    score: number;
};

const usersScores: UserScore[] = [
    { username: "User123", score: 45678 },
    { username: "JohnDoe456", score: 37890 },
    { username: "TechGeek007", score: 62543 },
    { username: "CodingMaster99", score: 54321 },
    { username: "GamerGirl23", score: 48765 },
    { username: "WebDevPro555", score: 57890 },
    { username: "DesignWizard123", score: 60123 },
    { username: "HackerElite789", score: 52345 },
    { username: "CodeNinja456", score: 49876 },
    { username: "DigitalArtist22", score: 42109 },
    { username: "CyberSecExpert777", score: 55432 },
    { username: "AIEnthusiast555", score: 51234 },
    { username: "TechSavvyGirl69", score: 53987 },
    { username: "WebDesignPro222", score: 59876 },
    { username: "User123", score: 45678 },
    { username: "JohnDoe456", score: 37890 },
    { username: "TechGeek007", score: 62543 },
    { username: "CodingMaster99", score: 54321 },
    { username: "GamerGirl23", score: 48765 },
    { username: "WebDevPro555", score: 57890 },
    { username: "DesignWizard123", score: 60123 },
    { username: "HackerElite789", score: 52345 },
    { username: "CodeNinja456", score: 49876 },
    { username: "DigitalArtist22", score: 42109 },
    { username: "CyberSecExpert777", score: 55432 },
    { username: "AIEnthusiast555", score: 51234 },
    { username: "TechSavvyGirl69", score: 53987 },
    { username: "WebDesignPro222", score: 59876 },
];

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
                <Leaderboard usersScores={usersScores}></Leaderboard>
            </div>
        </div>
    );
}
