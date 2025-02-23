const getLocalGameStatus = () => {
	const gameStatus = localStorage.getItem("game_status") || "null";
	if (gameStatus === null) {
		localStorage.setItem("game_status", "null");
		return "null";
	}
	return gameStatus;
}

export default getLocalGameStatus;
