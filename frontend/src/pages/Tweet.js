import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserInfo from "../hooks/useUserInfo";
import SideBar from "../components/sideBar";
import TweetCard from "../components/tweetCard";
import TweetPostForm from "../components/tweetPostForm";
import axios from "axios";
import TweetEditForm from "../components/tweetEditForm";

export default function TweetPage() {
	const { userId, tweetId } = useParams();
	const [isAuthor, setIsAuthor] = useState(false);
	// hard code
	const [isLogin, setLogin] = useState(true);
	const [tweet, setTweet] = useState(null);
	const [status, setStatus] = useState("loading");
	const [isEdit, setIsEdit] = useState(false);
	const navigate = useNavigate();
	//   ***** todo: implement login for user id *****
	// hard code a user

	const {
		userInfo,
		setUserInfo,
		status: userInfoStatus,
	} = useUserInfo(userId);

	async function getTweet() {
		await axios.get("/api/tweets/" + tweetId).then(function (response) {
			setTweet(response.data);
			setStatus("pass");
			// ask TA about delay check
			if (userId === response.data.author) {
				setIsAuthor(true);
			}
		});
	}

	// delete current tweet
	async function deleteTweet() {
		await axios.delete("/api/tweets/" + tweetId).then(function (response) {
			setStatus("pass");
			let path = "/";
			navigate(path);
		});
	}

	// navigate to edit page
	function updateTweet() {
		setIsEdit(true);
	}

	// cancel the update
	function cancelUpdate() {
		setIsEdit(false);
	}

	useEffect(() => {
		getTweet();
	}, [tweetId]);

	if (userInfoStatus === "loading") {
		return "";
	}

	// http://localhost:3000/tweet/643fa08b70e1182c4f02e300 test url

	return (
		<div className="h-screen bg-slate-400 flex flex-row">
			{/* sidebar */}
			<SideBar curUser={userInfo} isLogin={isLogin} />
			{/* main feed */}
			<div className="flex-1 bg-white border-x-2 overflow-y-scroll">
				<div className="px-5 py-2 flex justify-between">
					<Link to={"/"}>
						<div className="flex mb-2 cursor-pointer items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 mr-3"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
								/>
							</svg>
							<h1 className="font-bold text-lg">Tweet</h1>
						</div>
					</Link>
					{/* <div className="flex-l"></div> */}
					{isAuthor && (
						<div className="flex">
							{!isEdit && (
								<button
									className=" bg-blue-500 rounded-full w-20 text-white hover:bg-blue-400"
									onClick={updateTweet}
								>
									Edit
								</button>
							)}

							{isEdit && (
								<button
									className=" bg-slate-500 rounded-full w-20 text-white hover:bg-slate-400"
									onClick={cancelUpdate}
								>
									Cancel
								</button>
							)}
							{!isEdit && (
								<button
									className="bg-red-500 rounded-full w-20 text-white hover:bg-red-400"
									onClick={deleteTweet}
								>
									Delete
								</button>
							)}
						</div>
					)}
				</div>
				{isEdit && (
					<TweetEditForm
						curUser={userInfo}
						placeholder={tweet.text}
						tweetId={tweet._id}
					/>
				)}
				{!isEdit && <TweetCard tweet={tweet} isDetail={true} />}
			</div>
		</div>
	);
}
