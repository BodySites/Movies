import { Provider } from "react-redux";
import store from "./redux/store";
import { useRoutes } from "react-router-dom";
import router from "./Route";

function App() {
	const routerElement = useRoutes(router);

	return <Provider store={store}>{routerElement}</Provider>;
}

export default App;
