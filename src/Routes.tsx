import { BrowserRouter, IndexRoute, IndexRedirect, Route, Routes } from "react-router";

import Login from "./components/Login";
import Menu from "./components/Menu";
import Game from "./components/Game";

const makeRoutes = (requireAuth = () => {}) => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path={"/login"} element={<Login />} />
				<Route path={"/game"} element={<Game />} />
				<Route path={"/menu"} element={<Menu />} />
			</Routes>
		</BrowserRouter>
	);
}

export default makeRoutes;
