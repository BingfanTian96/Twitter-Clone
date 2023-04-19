import "../css/App.css";
import SideBar from "../components/sideBar";
import { useRef, useEffect, useState } from "react";
import TweetPostForm from "../components/tweetPostForm";
import TweetCard from "../components/tweetCard";
import TweetHeader from "../components/tweetHeader";
import axios from "axios";
import useUserInfo from "../hooks/useUserInfo";

export default function App() {
	const [isLogin, setLogin] = useState(false);
	const [tweets, setTweets] = useState([]);

	//   ***** todo: implement login for user id *****
	// hard code a user
	const userId = "643df1e3a06589780dda2a68";
	const sessionStatus = "authenticated";
	// const {
	// 	userInfo,
	// 	setUserInfo,
	// 	status: userInfoStatus,
	// } = useUserInfo(userId, sessionStatus);

	// if (userInfoStatus === "authenticated") {
	// 	setLogin(true);
	// }

	// function logOut() {
	// 	setUserInfo(null);
	// }

	// console.log(userInfo);
	// console.log(userInfo.img);
	// const user = userInfo;

	const user = new Object();
	user.username = "Pikechu";
	user.email = "123445@test.com";
	user.password = "cs5610";
	user.name = "Twitter user";
	user.img =
		"https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png";

	// get all posts
	async function getAllTweets() {
		const response = await axios.get("/api/tweets/");
		setTweets(response.data);
	}

	useEffect(() => {
		getAllTweets();
	}, []);

	return (
		<div className="h-screen bg-slate-400 flex flex-row">
			{/* sidebar */}
			<SideBar curUser={user} isLogin={isLogin} />
			{/* main feed */}
			<div className="flex-1 bg-white border-x-2 overflow-y-scroll">
				<TweetHeader />

				{isLogin ? <TweetPostForm curUser={user} /> : null}

				<div>
					{tweets.length > 0 &&
						tweets.map((post) => (
							<div key={post._id}>
								<TweetCard
									tweet={post}
									sessionStatus={sessionStatus}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
