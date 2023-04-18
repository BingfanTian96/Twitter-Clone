import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
// import LoginPage from "./pages/login";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/home",
		element: <App />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
