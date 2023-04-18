import "../css/App.css";
import SideBar from "../components/sideBar";
import { useRef, useEffect, useState } from "react";
// import TweetPostForm from "../components/tweetPostForm";
// import TweetCard from "../components/tweetCard";
// import TweetHeader from "../components/tweetHeader";
// import axios from "axios";
import useUserInfo from "../hooks/useUserInfo";

function logOut() {
	setUserInfo(null);
}

export default function App() {
	const [isLogin, setLogin] = useState(true);

	//   ***** todo: user info get from api *****
	// hard code a user
	const userId = "643df1e3a06589780dda2a68";
	const sessionStatus = "authenticated";
	const {
		userInfo,
		setUserInfo,
		status: userInfoStatus,
	} = useUserInfo(userId, sessionStatus);

	// console.log(userId);
	console.log(userInfo[0]);
	const user = userInfo[0];
	// console.log(status);

	return (
		<div className="h-screen bg-slate-400 flex flex-row">
			{/* sidebar */}
			<SideBar curUser={user} isLogin={isLogin} />
			{/* main feed */}
			{/* <div className="flex-1 bg-white border-x-2 overflow-y-scroll">
				<TweetHeader />

				{isLogin ? <TweetPostForm curUser={user} /> : null}

				<TweetCard />
			</div> */}
		</div>
	);
}
