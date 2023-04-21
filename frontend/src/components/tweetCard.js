import { Link } from "react-router-dom";
import "../css/App.css";
import useUserInfo from "../hooks/useUserInfo";
import { useState } from "react";
import ReactTimeAgo from "react-time-ago";

export default function TweetCard({ tweet, isDetail }) {
	const [isLoading, setLoading] = useState(true);

	// const [isLogin, setLogin] = useState(true);
	const userId = tweet.author;
	// console.log(tweet.author);
	const time = new Date(tweet.createdAt);

	const {
		userInfo,
		setUserInfo,
		status: userInfoStatus,
	} = useUserInfo(userId);

	if (userInfoStatus === "loading") {
		return "";
	}

	function showImages() {
		if (!tweet.images?.length) {
			return "";
		}
		return (
			<div className="flex -mx-1">
				{tweet.images.length > 0 &&
					tweet.images.map((img) => (
						<div className="m-1" key={img}>
							<img
								src={img}
								alt="img"
								style={{ width: "50%" }}
								// className=" h-0.5"
							/>
						</div>
					))}
			</div>
		);
	}

	return (
		<div className="flex flex-row p-3  border-b-2">
			<img
				src={userInfo.img}
				alt="user-icon"
				className="w-12 h-12 object-cover rounded-full"
			/>
			<div className="flex flex-col w-full">
				<div className="flex flex-row items-center">
					{!isDetail && (
						<div className="flex flex-row items-center">
							<h1 className="text-lg font-bold px-2">
								{userInfo.name}
							</h1>
							<h1 className="text-md font-semibold text-gray-500">
								@{userInfo.username}
							</h1>
						</div>
					)}
					{isDetail && (
						<div>
							<h1 className="text-lg font-bold px-2">
								{userInfo.name}
							</h1>
							<h1 className="text-sm font-semibold text-gray-500">
								@{userInfo.username}
							</h1>
						</div>
					)}

					{!isDetail && (
						<div className="text-sm text-gray-500 px-2">
							<ReactTimeAgo
								date={tweet.createdAt}
								locale="en-US"
							/>
						</div>
					)}
					<div className="flex-1"></div>
					<div className="hover:bg-slate-300 rounded-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
							/>
						</svg>
					</div>
				</div>
				{!isDetail && (
					<h1 className="text-base text-slate-500 px-2">
						<Link to={`/${userInfo?._id}/tweet/${tweet._id}`}>
							<div>
								{tweet.text}
								{showImages()}
							</div>
						</Link>
					</h1>
				)}
				{isDetail && (
					<div>
						<h1 className="text-base px-2 pt-2">
							{tweet.text}
							{showImages()}
						</h1>
						<h1 className="text-sm text-slate-500 px-2">
							post at: {time.toLocaleTimeString()},{" "}
							{time.toDateString()}{" "}
						</h1>
					</div>
				)}
				<div className="flex flex-row justify-between pr-44 pt-3 ">
					{/* comments */}
					<div className="flex flex-row hover:bg-slate-300 cursor-pointer rounded-full items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
							/>
						</svg>
						<div className="pl-2 text-sm">
							{tweet.commentsCount}
						</div>
					</div>
					{/* transmits */}
					<div className="flex flex-row hover:bg-slate-300 cursor-pointer rounded-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
						<div className="pl-2 text-sm">
							{tweet.transmitsCount}
						</div>
					</div>
					{/* likes */}
					<div className="flex flex-row hover:bg-slate-300 cursor-pointer rounded-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
							/>
						</svg>
						<div className="pl-2 text-sm">{tweet.likesCount}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
