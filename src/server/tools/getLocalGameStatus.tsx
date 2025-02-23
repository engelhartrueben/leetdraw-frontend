const getLocalGameStatus = () => {
	const gameStatus = localStorage.getItem("has_status") || "null";
	if (gameStatus === null) {
		localStorage.setItem("has_game", "null");
		return "null";
	}
	return gameStatus;
}

export default getLocalGameStatus;
