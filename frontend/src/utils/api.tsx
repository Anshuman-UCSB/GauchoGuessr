// apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://ssh.biggergig.com:8000'; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const registerGame = async () => {
	try {
		console.log("Sending request");
		const response = await apiService.put('/game');
		return response.data.gameid;
	} catch (error) {
		throw error;
	}
}

export const getLink = async (gameId: string | null,stage: number) => {
	try {
		console.log("Sending request");
		const response = await apiService.get(`/game/${gameId}?stage=${stage}`);
		return response.data.link;
	} catch (error) {
		throw error;
	}
}

export const getLeaderboard = async () => {
	try {
		console.log("Sending request");
		const response = await apiService.get("/leaderboard/default");
		return response.data;
	} catch (error) {
		throw error;
	}
}
