import "../css/App.css";
import SideBar from "../components/sideBar.js";
import { useEffect, useState } from "react";
import TweetPostForm from "../components/tweetPostForm.js";
import TweetCard from "../components/tweetCard.js";
import TweetHeader from "../components/tweetHeader.js";
import axios from "axios";
import useUserInfo from "../hooks/useUserInfo.js";

export default function App() {
	const [tweets, setTweets] = useState([]);

	const {
		isLoggedIn,
		userInfo,
		setUserInfo,
		status: userInfoStatus,
	} = useUserInfo();

	// get all posts
	async function getAllTweets() {
		const response = await axios.get("/api/tweets/");
		setTweets(response.data);
	}

	useEffect(() => {
		getAllTweets();
	}, []);

	if (userInfoStatus === "loading") {
		return "loading the page";
	}

	return (
		<div className="h-screen bg-slate-400 flex flex-row">
			{/* sidebar */}
			<SideBar curUser={userInfo} isLogin={isLoggedIn} />
			{/* main feed */}
			<div className="flex-1 bg-white border-x-2 overflow-y-scroll">
				<TweetHeader />
				{/* tweet post form if login */}
				{isLoggedIn ? (
					<TweetPostForm
						curUser={userInfo}
						onPost={() => {
							getAllTweets();
						}}
						placeholder="What's happening"
						isEdit={false}
					/>
				) : null}
				{/* tweetcard for all tweets */}
				<div>
					{tweets.length > 0 &&
						tweets.map((post) => (
							<div key={post._id}>
								<TweetCard
									tweet={post}
									isDetail={false}
									currentUserId={post.author}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
