import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App.js";
import TweetPage from "./pages/Tweet.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import UserPage from "./pages/User.js";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";

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
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/signUp",
		element: <SignUpPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
