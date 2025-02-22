import { IndexRoute, IndexRedirect, Route } from "react-router";

import App from "./components/App";
import Registration from "./components/Registration";

const makeRoutes = (requireAuth = () => {}) => {
	console.log("I AM HERE");
	return(
		<Route>
			<Route path={"/"}>
				<Route element={<App />}>
					<Route element={<Registration />} path={"/registration"}>

					</Route>
				</Route>
			</Route>
		</Route>
	);
}

export default makeRoutes;
