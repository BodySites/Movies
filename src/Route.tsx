import { Navigate, RouteObject } from "react-router-dom";
import Movies from "./pages/Movies";
import SingleMovie from "./pages/SingleMovie";
import NotFound from "./pages/NotFound";

const router: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/movies" />
	},
	{
		path: "/movies",
		element: <Movies />
	},
	{
		path: "/movies/:id",
		element: <SingleMovie />
	},
	{
		path: "*",
		element: <NotFound />
	}
];

export default router;
