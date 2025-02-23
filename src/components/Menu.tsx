import { React, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import getLocalAuth from "../server/tools/getLocalAuth";
import c from "../server/connectors";
import getLocalGameId from "../server/tools/getLocalGameId";
import getLocalGameStatus from "../server/tools/getLocalGameStatus";

// TODO finish this out
interface UserInformaton {
	user_id: string
}

const Menu = () => {
	let userInfo: UserInformation;
	let gameId: "string" = getLocalGameId();
	let hasGame: boolean | string = getLocalGameStatus();
	let [searching, setSearching] = useState(false);

	let auth: { "authorization" : string } = {
		"authorization": getLocalAuth()
	}

	useEffect(() => {
		if (searching) {
			setInterval(pollGame, 200, gameId);
		}
		return () => {}
	}, [searching]);

	const logout = () => {
		localStorage.clear();	
		window.location.reload();
	}

	const setDefaultLocalStorage = () => {
		localStorage.setItem("game_id", "null");
		localStorage.setItem("has_game", false);
	}

	const findGame = async () => {
		// TODO Figure out this endpoint
		// TODO Figure out how we are differentiating between the game types
		const req = await c.post("/init_match")
		if (req.game_id) {
		   	gameId = req.game_id;
			setSearching(true);
		} else {
			alert("No game id found. Retry in a few moments")
			// May be silly, but keeps the server happy
			setSearching(false);
		}
	}

	const pollGame = async (id) => {
		if (id == "null") {
			alert("ERROR: NO GAME ID");
			setSearching(false);
			return;
		}

		const body = {
			...auth,
			"game_id": id,
		}
	
		const req = await c.post("/poll_match", body);
		if (req.game_ready) {
			setSearching(false);
			localStorage.setItem("has_game", true);
		}
	}

	const getUserInformation = async () => {
		// TODO find user information endpoint
		const req: UserInformation = await c.post("/user_information", auth);

	}

	// If no auth, send the user back to login
	if (auth["authorization"] == "null") {
		return <Navigate to="/login" replace />
	}

	// If gameId, send user to the game screen
	if (gameId != "null" && hasGame == true) {
		return <Navigate to="/game" replace />
	}
	
	console.log("HERE");
	return (
		<div>
			<h1>1337Draw</h1>
			<div id="user_information">

			</div>
			<div id="game_options">

			</div>
		</div>
	);
}

export default Menu;
