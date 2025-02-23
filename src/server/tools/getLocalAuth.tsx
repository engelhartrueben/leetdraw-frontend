const getLocalAuthToken = () => {
	return localStorage.getItem("auth") || "null";
}

export default getLocalAuthToken;
