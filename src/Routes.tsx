import { BrowserRouter, IndexRoute, IndexRedirect, Route, Routes } from "react-router";

import Login from "./components/Login";
import Menu from "./components/Menu";
import Game from "./components/Game";

const makeRoutes = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path={"/login"} element={<Login />} />
				<Route path={"/menu"} element={<Menu />} />
				<Route path={"/match"} element={<Game />} />
			</Routes>
		</BrowserRouter>
	);
}

export default makeRoutes;
