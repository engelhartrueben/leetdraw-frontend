import { React, Navigate } from "react";

import getLocalAuth from "../server/tools/getLocalAuth";
import getLocalGameId from "../server/tools/getLocalGameId";
import c from "../server/connectors";

import QuestionBox from "../containers/QuestionBox"
import AnswerBox from "../containers/AnswerBox"

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

// What does this loading screen look like?
const WaitingOnGame = () => {
	return (
		<div>
			<p>Waiting on a Game</p>
		</div>
	);
}


// include 
// QuestionBox
// AnswerBox
const GameBox = (props) => {
	return (
		<div>
			<div>
				<QuestionBox props={props} />
			</div>
			<div>
				<AnswerBox props={props} />
			</div>
		</div>
	);
}

const Game = () => {
	localStorage.setItem("has_game", false);
	
	let auth: AuthBody = {
	   	"authorization": getLocalAuth(),
		"game_id": getLocalGameId(),
	}
	
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
		// check whether or not there is a game ready, 
		// if not, continue polling
		// else has_game is true and we load GameBox
	}

	const postResults = (auth) => {
		// auth is probably not correct here
		const req = c.post("/doesNotExist", auth); 

	setInterval(getGame, 200, auth);

	return(
		<div>
			<h1>Game</h1>
			{localStorage.getItem("has_game") == "true" ? <GameBox /> : <WaitingOnGame /> }
		</div>
	);
}

export default Game;
