import { useState, useEffect } from 'react';

import {
	AnswerBox,
	GameMenu,
	LoginScreen,
	QuestionBox,
	UserInfo,
	Header
} from "./containers/index";

const App = async () => {
	const [auth, setAuth] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	// hasGame might be redundent
	const [gameId, setGameId] = useState("");
	const [hasGame, setHasGame] = useState(false);
	const [searching, setSearching] = useState(false);
	const [poll, setPoll] = useState("");

	// standardize polling rates
	const pollingRate = Object.freeze({
		slow: 500,
		fast: 200,
		dumb: 50,
	});

	// If there is auth stored in local storage, set the local
	// auth in state, and set loggedIn to true
	if (localStorage.auth) {
		setAuth(localStorage.getItem("auth"));
		setLoggedIn(true);
	} else {
		localStorage.setItem("auth", "");
	}

	// If a user opens a the game and there is a gameId stored
	// in localStorage, ping back end to see if the game is still
	// going on. If yes, open the game. If no, delete gameId and
	// notify the user.
	if (localStorage.gameId) {
		setGameId(localStorage.getItem("gameId"));
		// TODO post to backend to see if this game is still
		// occuring 
		// TODO verify that the response requires "game_id", and returns
		// a "hasGame" key
		setHasGame(await c.post("/game_match", { "authorization": auth, "game_id": gameId })["hasGame"]);
		// useEffect will be used to watch if there is a game ^^^
		
		if (!hasGame) {
			alert("Game has concluded");
			localStorage.setItem("gameId", "");
			setGameId("");
		}
	}

	// If change in auth, then show menu
	useEffect(() => {
		 
	}, [loggedIn]);

	// When the user logs out, remove the cached auth token,
	// and clears the state.
	// This will trigger a useEffect that transfers the user to the log
	// in screen.
	const logout: void = () => {
		localStorage.setItem("auth", "");
		localStorage.setItem("gameId", "");
		setAuth("");
		setLoggedIn(false);
		setHasGame(false);
		setGameId("");
		setPoll("");
	}
	
	// returns back the header commonly found in api calls that
	// requires the auth token. Allows for extra keys, but defaults
	// to returning on the auth key and value if no extra parameters
	// are given.
	const makeAuthBody = (extras = {}) => {
		// Will have already checked if user has some auth token
		return {
			...extras,
			"authorization": auth
		};	
	}

	// helper function to check if the user has authorization in any given
	// action. Generally called before making a post request. 
	// checks if auth exists and check if it is of proper length.
	// TODO check to make sure the auth length is actually 64 lol
	const hasAuth: boolean = () => {
		return auth && auth.length === 64;
	}
	
	// When the user requests a game, they will send a post request to the
	// backend. This post request requires auth and game type (calc1, calc2,
	// chem1, chem2, ...).
	const getGameLobby: void = async (gameType: string) => {
		// If no auth, log the user out.
		if (!hasAuth) logout();

		if (!searching)	{
			console.alert("If you see this, you have bad code");
		}

		// post to backend to get gameId
		// TODO actually connect
		setInterval(() => {
			// if we have a gameId, stop the interval
			// Could do this when we store gameId, but we will see I suppose
			if (gameId && hasGame) clearInterval(interval);

			// TODO handle server errors in external file
			// const req = await c.post("init_match", makeAuthBody())["game_id"]); 
			if (req.response === 400 && !hasAuth()) logout();
			if (req.response === 500) {
				alert("SERVER RESPONSE: 500\nPotential issue with the server. Try again later.");
				setSearching(false);
			}

			// TODO unsure if status will give the error
			if (!req.ok) console.error(`ERROR ${req.status}`);
			
			if (req.ok && req["game_id"]) {
				setGameId(req["game_id)"]);
				setHasGame(true);
			}

		}, polling.slow)
		
		// If the server responds with a 400 error, check auth code.
		// If the server responds with a 500 error, notify the user that there
		// may be issues with the server.
	}

	// polling logic once the user has a gameId. This acts as two fold.
	// First, waits for the lobby to find a second player.
	// Two, once a second player has entered, has a key that holds
	// question information. 
	const pollGameLobby: void = () => {
		if (!hasAuth) logout();

		// Check if gameId is in state. 
		// If not, clear all game data (gamdId and hasGame)
		if (!gameId) clearGame();

		setInterval(() => {
			// poll the backend about the game lobby. 
			// Checks for the active question
			// Checks if the other user has answered the
			// question successfully
			// const req = await c.post("/game", auth);
		}, polling.fast)
	}

	const clearGame: void = () => {
		localStorage.setItem("gameId", "");
		setGameId("");
		setHasGame(false);

		// Don't love alerts, but whatever.
		alert("Game has concluded");
	}

	return (
		<>
			<Header userName={userName} />	
		</>
	);
};


export default App;
