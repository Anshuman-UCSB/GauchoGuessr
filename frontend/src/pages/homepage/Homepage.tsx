import React, { useEffect, useState } from "react";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import StrokeText from "../../components/stroketext/StrokeText";
import "./Homepage.scss";
import { getLeaderboard } from "../../utils/api";

type UserScore = {
    name: string;
    score: number;
};

type HomepageProps = {
    handleState: () => void;
};

// const usersScores: UserScore[] = await getLeaderboard();

const Homepage: React.FC<HomepageProps> = ({ handleState }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [usersScores, setUsersScores]=useState<UserScore[]>([]);
    const [error, setError] = useState<Error|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // TODO: use error/loading for conditional rendering

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
        setIsLoading(true);

        try {
            const result = await getLeaderboard();
            setUsersScores(result);
        } catch (error:any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
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
