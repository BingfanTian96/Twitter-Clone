import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import TweetPage from "./pages/Tweet";
// import LoginPage from "./pages/login";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import UserPage from "./pages/User";

TimeAgo.addDefaultLocale(en);

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/tweet/:tweetId",
		element: <TweetPage />,
	},
	{
		path: "/user/:userId",
		element: <UserPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
