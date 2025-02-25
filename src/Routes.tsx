import { BrowserRouter, IndexRoute, IndexRedirect, Route, Routes } from "react-router";

import App from "./components/App";

const makeRoutes = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path={"/app"} element={<App />} />
			</Routes>
		</BrowserRouter>
	);
}

export default makeRoutes;
