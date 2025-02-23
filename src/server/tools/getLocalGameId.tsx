const getLocalGameId = () => {
	const game_id = localStorage.getItem("game_id");
	if (game_id === null) {
		localStorage.setItem("game_id", "null");
		return "null"
	}
	return game_id;
}

export default getLocalGameId;
