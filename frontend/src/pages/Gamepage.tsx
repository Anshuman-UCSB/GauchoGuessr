import React, { useEffect, useState } from "react";
import Pano from "../components/Pano";
import { registerGame, getLink } from "../utils/api";
interface gameId{

}
export default function Gamepage({ gameId:string }) {
    const [image, setImage] = useState("");
    const [stage, setStage] = useState(0);
    // useEffect(() => {
    //     const getGameId = async () =>{
	// 		const result = await registerGame();
	// 		console.log("fetched data",result);
	// 		setGameId(result);
	// 	}
	// 	getGameId();
    // }, [])
    useEffect(() => {
        const setImage = async () =>{
			const result = await getLink(gameId, stage);
			console.log("fetched data",result);
			setImage(result);
		}
		setImage();
    }, [stage])
    console.log("Game id:",gameId);
    
    return <div>
        <div><Pano width="1300" height="1000" src={image} title="Demo" /></div>
        </div>;
}
