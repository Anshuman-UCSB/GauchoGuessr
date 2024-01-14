import React, { useEffect, useState } from "react";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import StrokeText from "../../components/stroketext/StrokeText";
import "./Homepage.scss";

type UserScore = {
    username: string;
    score: number;
};

type HomepageProps = {
    handleState: () => void;
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

const Homepage: React.FC<HomepageProps> = ({ handleState }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Function to determine font size based on screen width
    const getFontSize = (baseSize: any) => {
        if (screenWidth <= 700) {
            return baseSize * 0.6; // Half size on small screens
        } else if (screenWidth <= 1300) {
            return baseSize * 0.75; // 75% size on medium screens
        }
        return baseSize; // Full size on large screens
    };

    return (
        <div className="homepage">
            <div className="wrapper">
                <div className="start">
                    <div className="title-text">
                        <StrokeText
                            text="GAUCHO GUESSR"
                            fontFamily="'Inter', sans-serif"
                            color="#fff"
                            fontSize={`${getFontSize(120)}px`}
                            fontStyle="italic"
                            fontWeight="900"
                            lineHeight={`${getFontSize(110)}px`}
                            textAlign="center"
                            shadowColor="#000"
                            xOffset="-4px"
                            yOffset="4px"
                            webkitTextStroke="10px black"
                        />
                    </div>
                    <button onClick={handleState}>
                        <StrokeText
                            text="START!"
                            fontFamily="'Inter', sans-serif"
                            color="#fff"
                            fontSize={`${getFontSize(80)}px`}
                            fontStyle="italic"
                            fontWeight="900"
                            lineHeight={`${getFontSize(70)}px`}
                            textAlign="center"
                            shadowColor="#000"
                            xOffset="-4px"
                            yOffset="4px"
                            webkitTextStroke="5px black"
                        />
                    </button>
                    <p>
                        How well do you know UCSB’s campus? Guess your location
                        to earn points, and see if you can top the leaderboard!
                    </p>
                </div>
                <div className="leaderboard">
                    <Leaderboard usersScores={usersScores}></Leaderboard>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
