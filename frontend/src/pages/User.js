import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserInfo from "../hooks/useUserInfo";
import SideBar from "../components/sideBar";
import TweetCard from "../components/tweetCard";
import TweetPostForm from "../components/tweetPostForm";
import axios from "axios";
import TweetEditForm from "../components/tweetEditForm";
import TopNavLink from "../components/topNav";

export default function UserPage() {
	// get userId from login function
	//   ***** todo: implement login for user id *****
	// hard code a user
	const currentUserId = "643f4d88a87cdb51ed6ed0c6";
	// hard code login status
	const [isLogin, setLogin] = useState(true);
	const { userId } = useParams();
	const [isAuthor, setIsAuthor] = useState(false);
	const [tweet, setTweet] = useState(null);
	const [tweetsStatus, setTweetsStatus] = useState("loading");
	const navigate = useNavigate();
	const [profileInfo, setProfileInfo] = useState();
	const [originalUserInfo, setOriginalUserInfo] = useState();
	const [tweets, setTweets] = useState([]);
	const [editMode, setEditMode] = useState(false);

	// for current login user info
	const {
		userInfo,
		setUserInfo,
		status: userInfoStatus,
	} = useUserInfo(currentUserId);

	// get user page profile info
	useEffect(() => {
		if (!userId) {
			return;
		}
		axios.get("/api/users/" + userId).then((response) => {
			setProfileInfo(response.data);
			setOriginalUserInfo(response.data);
		});
	}, [userId]);

	// get all tweets post by this user
	useEffect(() => {
		if (!profileInfo?._id) {
			return;
		}
		axios.get("/api/tweets/userId/" + profileInfo._id).then((response) => {
			setTweets(response.data.posts);
		});
	}, [profileInfo]);

	const isMyProfile = profileInfo?._id === userInfo?._id;

	// delete current tweet
	// async function deleteTweet() {
	// 	await axios.delete("/api/tweets/" + tweetId).then(function (response) {
	// 		setStatus("pass");
	// 		let path = "/";
	// 		navigate(path);
	// 	});
	// }

	// navigate to edit page
	// function updateTweet() {
	// 	setIsEdit(true);
	// }

	// cancel the update
	// function cancelUpdate() {
	// 	setIsEdit(false);
	// }

	if (userInfoStatus === "loading") {
		return "";
	}

	return (
		<div className="h-screen bg-slate-400 flex flex-row">
			{/* sidebar */}
			<SideBar curUser={userInfo} isLogin={isLogin} />
			{/* main feed */}
			<div className="flex-1 bg-white border-x-2 overflow-y-scroll">
				<TopNavLink title={userInfo.name} />
			</div>
		</div>
	);
}
