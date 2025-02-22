// const backend = process.env.BACKEND_URL;

const post = async (path: string, data = {}: any ) => {
	let url: string;
	if(__VITE_BACKEND_PORT__) {
		url = `http://${__VITE_BACKEND_URL__}:${__VITE_BACKEND_PORT__}`;
	} else {
		url = `http://${__VITE_BACKEND_URL__}`;
	}
	try {
		const response: string = await fetch(`${url}/${path}`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-type": "application/json",
			},
			body: JSON.stringify(data),
		});
		
		if (!response.ok) {
			console.error('bad response');
			return { "response": 400 };
		}

		const json: string = await response.json();

		if (__VITE_DEBUG_MODE__) console.log(json);

		return JSON.stringify(json); 

		} catch (error) {
			throw new Error(`post request bad: ${error}`);
			return {};
		}
}

const get = async (path: string) => {
	let url: string;
	if(__VITE_BACK_PORT__) {
		url = `http://${__VITE_BACKEND_URL__}:${__VITE_BACKEND_PORT__}`;
	} else {
		url = `http://${__VITE_BACKEND_URL__}`;
	}

	try {
		const response: stirng = await fetch(`${url}/${path}`, {
			method: "GET",
			headers: {
				"Accept": "application/json",
				"Content-type": "applicaiton/json",
			},
		});

		if (!reponse.ok) {
			console.log('bad response');
			return { "response": 400 };
		}

		const json: string = await response.json();
		
		if (__VITE_DEBUG_MODE__) console.log(json);

		return JSON.stringify(json);	
		
		} catch (error) {
			throw new Error(`get request bad: ${error}`);
			return {};
		}
}


const connectors = {
	post,
	get,
};

export default connectors;
