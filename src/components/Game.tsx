import { React, Navigate } from "react";

import getLocalAuth from "../server/tools/getLocalAuth";
import getLocalGameId from "../server/tools/getLocalGameId";
import c from "../server/connectors";

// TODO this is so such a guess
// Verify with cole
interface GameResponse {
	game_id: string
	question: string
	status: boolean
}

interface AuthBody {
	auth: string
	game_id: string
}

const WaitingOnGame = () => {
	return <p>waiting on game</p>;
}

const Game = () => {
	localStorage.setItem("has_game", false);
	
	let auth: AuthBody = {
	   	"authorization": getLocalAuth(),
		"game_id": getLocalGameId(),
	}
	console.log(auth);
	
	// if no auth, throw to login screen
	if (auth["authorization"] == "null") {
		return <Navigate path="/login" replace />;
	}
	
	// if no game_id, return to main menu
	if (auth["game_id"] == "null") {
		return <Navigate path="/menu" replace />;
	}

	const getGame = (auth) => {
		if (auth["authorization"] == "null") window.location.reload();
		// const req: GameResponse = c.post("/get_game", auth);

		// TODO Do something
	}

	setInterval(getGame, 200, auth);
	return(
		<div>
			<h1>Game</h1>
			{localStorage.getItem("has_game") == "true" ? <p>we have a game!!!</p> : <p>waiting</p>}
		</div>
	);
}

export default Game;
