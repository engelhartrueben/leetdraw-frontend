import { React, useEffect } from "react";
import { Navigate } from "react-router-dom";

import getLocalAuth from "../server/tools/getLocalAuth";
import c from "../server/connectors";
import { getLocalGameId, getLocalGameStatus } from "../server/tools/index"

interface UserInformaton {
	user_id: string
}

const Menu = () => {
	let userInfo: UserInformation;
	let gameId: "string" = "null";
	let searching: boolean = false;

	let auth: { "authorization" : string } = {
		"authorization": getLocalAuth()
	}

	useEffect(() => {
		setInterval(pollGame, 200, gameId);
	}, [searching]);

	const logout = () => {
		localStorage.clear();	
		window.location.reload();
	}

	const findGame = async () => {
		// TODO Figure out this endpoint
		// TODO Figure out how we are differentiating between the game types
		const req = await c.post("/init_match")
		if (req.game_id) {
		   	gameId = req.game_id;
			searching = true;
		} else {
			alert("No game id found. Retry in a few moments")
			// May be silly, but keeps the server happy
			searching = false;
		}
	}

	const pollGame = async (id) => {
		if (id == "null") {
			alert("ERROR: NO GAME ID");
			searching = false;
			return;
		}

		const body = {
			...auth,
			"game_id": id,
		}
	
		const req = await c.post("/poll_match", body);
		if (req.game_ready) searching = false;
		// Navigate to the game lobby
	}

	const getUserInformation = async () => {
		// TODO find user information endpoint
		const req: UserInformation = await c.post("/user_information", auth);

	}

	return (auth == "null") ? <Navigate to="/login" replace /> : (
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
