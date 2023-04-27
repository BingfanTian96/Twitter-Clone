import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserInfo from "../hooks/useUserInfo.js";
import SideBar from "../components/sideBar.js";
import TweetCard from "../components/tweetCard.js";
import axios from "axios";
import TopNavLink from "../components/topNav.js";

export default function UserPage() {
	const { userId } = useParams();
	const [tweets, setTweets] = useState([]);
	const [tweetsStatus, setTweetsStatus] = useState("loading");
	const [profileStatus, setProfileStatus] = useState("loading");
	const [profileInfo, setProfileInfo] = useState();
	// Note that the original user info stands for the info of the logged in user.
	const [originalUserInfo, setOriginalUserInfo] = useState();
	const [editMode, setEditMode] = useState(false);

	// for current login user info
	const {
		isLoggedIn,
		userInfo,
		setUserInfo,
		status: userInfoStatus,
	} = useUserInfo();

	// get user page profile info
	useEffect(() => {
		console.log("user id on this page is: " + userId);
		if (!userId) {
			return;
		}
		console.log("user id on this page is: " + userId);
		axios
			.get("/api/users/" + userId)
			.then((response) => {
				setProfileInfo(response.data);
				setOriginalUserInfo(response.data);
				setProfileStatus("pass");
			})
			.then(() => {
				console.log("I have passed");
			});
	}, [userId]);

	// get all tweets post by this user
	useEffect(() => {
		if (!profileInfo?._id) {
			return;
		}
		axios.get("/api/tweets/userId/" + profileInfo._id).then((response) => {
			setTweets(response.data);
			setTweetsStatus("pass");
		});
	}, [profileInfo]);

	async function updateProfile() {
		await axios.put("/api/users/edit", {
			_id: profileInfo._id,
			name: profileInfo.name,
			username: profileInfo.username,
			about: profileInfo.about,
			img: profileInfo.img,
		}, {
			withCredentials: true,
		});

		setEditMode(false);
		window.location.reload(true);
	}

	function cancel() {
		setProfileInfo((prev) => {
			const { about, name, username } = originalUserInfo;
			return { ...prev, about, name, username };
		});
		setEditMode(false);
	}

	if (
		userInfoStatus === "loading" ||
		profileStatus === "loading" ||
		tweetsStatus === "loading"
	) {
		return "";
	}

	const isMyProfile = userId === userInfo?._id;
	const time = new Date(profileInfo.createdAt);

	return (
		<div className="h-screen bg-slate-400 flex flex-row">
			{/* sidebar */}
			<SideBar curUser={userInfo} isLogin={isLoggedIn} />
			{/* main feed */}
			<div className="flex-1 bg-white border-x-2 overflow-y-scroll">
				<div className="px-5 pt-2">
					<TopNavLink title={profileInfo.name} />
				</div>

				<div className="flex justify-between items-end">
					<div className="ml-5 relative">
						<div className=" border-4 rounded-full border-slate-300 overflow-hidden">
							<img
								src={profileInfo.img}
								alt="user-icon"
								className="w-24 h-24 object-cover rounded-full"
							/>
						</div>
					</div>
					<div className="p-2">
						{isMyProfile && (
							<div>
								{!editMode && (
									<button
										onClick={() => setEditMode(true)}
										className="bg-blue-500 text-white py-2 px-5 rounded-full"
									>
										Edit profile
									</button>
								)}
								{editMode && (
									<div>
										<button
											onClick={() => cancel()}
											className="bg-slate-400 text-black py-2 px-5 rounded-full mr-2 hover:bg-slate-300"
										>
											Cancel
										</button>
										<button
											onClick={() => updateProfile()}
											className="bg-blue-500 text-white py-2 px-5 rounded-full hover:bg-blue-400"
										>
											Save profile
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
				<div className="px-5 mt-2 border-b-2">
					{!editMode && (
						<h1 className="font-bold text-2xl leading-5 pt-3">
							{profileInfo.name}
						</h1>
					)}
					{editMode && (
						<div>
							<input
								type="text"
								value={profileInfo.name}
								onChange={(ev) =>
									setProfileInfo((prev) => ({
										...prev,
										name: ev.target.value,
									}))
								}
								className="bg-slate-300 p-2 mb-2 rounded-full"
							/>
						</div>
					)}
					{!editMode && (
						<h2 className="text-slate-400 text-sm pt-3">
							@{profileInfo.username}
						</h2>
					)}
					{editMode && (
						<div>
							<input
								type="text"
								value={profileInfo.username}
								onChange={(ev) =>
									setProfileInfo((prev) => ({
										...prev,
										username: ev.target.value,
									}))
								}
								className="bg-slate-300 p-2 mb-2 rounded-full"
							/>
						</div>
					)}
					{!editMode && (
						<h2 className=" text-md pt-3">{profileInfo.about}</h2>
					)}
					{editMode && (
						<div>
							<input
								type="text"
								value={profileInfo.about}
								onChange={(ev) =>
									setProfileInfo((prev) => ({
										...prev,
										about: ev.target.value,
									}))
								}
								className="bg-slate-300 p-2 mb-2 rounded-full"
							/>
						</div>
					)}
					{editMode && (
						<div>
							<input
								type="text"
								value={profileInfo.img}
								onChange={(ev) =>
									setProfileInfo((prev) => ({
										...prev,
										img: ev.target.value,
									}))
								}
								className="bg-slate-300 p-2 mb-2 rounded-full"
							/>
						</div>
					)}
					{!editMode && (
						<div className="text-slate-400 text-sm mt-2 mb-2 pt-3">
							Create at: {time.toLocaleTimeString()},{" "}
							{time.toDateString()}{" "}
						</div>
					)}
				</div>
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
