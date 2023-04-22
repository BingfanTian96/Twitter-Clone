import "../css/App.css";
import SideBar from "../components/sideBar";
import { useEffect, useState } from "react";
import TweetPostForm from "../components/tweetPostForm";
import TweetCard from "../components/tweetCard";
import TweetHeader from "../components/tweetHeader";
import axios from "axios";
import useUserInfo from "../hooks/useUserInfo";

export default function App() {
	//   ***** todo: implement login for user id *****
	// hard code a user
	const userId = "643f4d88a87cdb51ed6ed0c6";
	// hard code login status
	const [isLogin, setLogin] = useState(true);
	const [tweets, setTweets] = useState([]);

	const {
		userInfo,
		setUserInfo,
		status: userInfoStatus,
	} = useUserInfo(userId);

	// get all posts
	async function getAllTweets() {
		const response = await axios.get("/api/tweets/");
		setTweets(response.data);
	}

	useEffect(() => {
		getAllTweets();
	}, []);

	// console.log(tweet);
	if (userInfoStatus === "loading") {
		return "loading user info";
	}

	return (
		<div className="h-screen bg-slate-400 flex flex-row">
			{/* sidebar */}
			<SideBar curUser={userInfo} isLogin={isLogin} />
			{/* main feed */}
			<div className="flex-1 bg-white border-x-2 overflow-y-scroll">
				<TweetHeader />

				{isLogin ? (
					<TweetPostForm
						curUser={userInfo}
						onPost={() => {
							getAllTweets();
						}}
						placeholder="What's happening"
						isEdit={false}
					/>
				) : null}

				<div>
					{tweets.length > 0 &&
						tweets.map((post) => (
							<div key={post._id}>
								<TweetCard
									tweet={post}
									isDetail={false}
									currentUserId={userId}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
