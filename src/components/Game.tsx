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


const Game = () => {
	let auth: AuthBody = {
	   	"authorization": getLocalAuth(),
		"game_id": getLocalGameId(),
	}
	
	// auth is embedded
	if (auth["authorization"] == "null") {
		return <Navigate path="/login" replace />a
	}

	const getGame = (auth) => {
		if (auth["authorization"] == "null") window.location.reload();
		const req: GameResponse = c.post("/get_game", auth);

		// Do somthig
	}

	setInterval(getGame, 200, auth);

	return(
		<h1>Game</h1>
	);
}

export default Game;
