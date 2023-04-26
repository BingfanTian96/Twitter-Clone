import "../css/App.css";
import React from "react";

export default function ProfilePill({ curUser }) {
	return (
		<div className="w-full hover:bg-slate-200 flex flex-row justify-around items-center rounded-full cursor-pointer p-3">
			{/* user pic */}
			<img
				src={curUser?.img}
				alt="user-icon"
				className="w-12 rounded-full"
			/>
			{/* user info */}
			<div className="flex flex-col flex-1 px-2">
				<h1 className="text-lg font-bold">{curUser?.name}</h1>
				<h1 className="text-sm text-gray-600">@{curUser?.username}</h1>
			</div>
			{/* more button */}
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
	);
}
