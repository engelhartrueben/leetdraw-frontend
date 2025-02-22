import { BrowserRouter, IndexRoute, IndexRedirect, Route, Routes } from "react-router";

import App from "./components/App";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Game from "./components/Game";

const makeRoutes = (requireAuth = () => {}) => {
	console.log("I AM HERE");
	return(
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<App />} />
				<Route path={"/registration"} element={<Registration />} />
				<Route path={"/login"} element={<Login />} />
				<Route path={"/game"} element={<Game />} />
				<Route path={"/menu"} element={<Menu />} />
			</Routes>
		</BrowserRouter>
	);
}

export default makeRoutes;
