import "../css/App.css";
import axios from "axios";
import { useState } from "react";

export default function TweetPostForm({ curUser, onPost }) {
	const [text, setText] = useState("");
	const [images, setImages] = useState([]);
	const [imgPost, setImgPost] = useState(false);
	const [value, setValue] = useState("");
	const [hiding, setHiding] = useState(true);

	async function onPostSubmit(e) {
		e.preventDefault();
		if (text === "" && images.length === 0) {
			// pop some message here?
			setHiding(false);
			return;
		}

		if (curUser) {
			console.log("is the new post having author id: " + curUser._id);
			await axios.post("/api/tweets/", {
				author: curUser._id,
				text: text,
				images: images,
			});
			setText("");
			setValue("");
			setImages([]);
			setHiding(true);
			if (onPost) {
				onPost();
			}
		}
	}
	// https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png
	function addImg() {
		images.push(value);
		setValue("");
		setImgPost(false);
		console.log({ images });
	}

	return (
		<form
			className="flex flex-row p-3 w-full border-b-2"
			onSubmit={onPostSubmit}
		>
			{curUser ? (
				<img
					src={curUser.img}
					alt="user-icon"
					className="w-12 h-12 object-cover rounded-full"
				/>
			) : null}

			<div className="flex flex-col px-3 w-full">
				{!hiding && (
					<div className=" text-red-500">
						You can't post a tweet with empty text and empty images
					</div>
				)}
				<textarea
					type="text"
					className="bg-transparent focus:ring-0 outline-none text-2xl h-20"
					placeholder="What's happening"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>

				<div className="flex flex-row text-blue-500 justify-start items-center">
					{!imgPost && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 hover:bg-slate-400"
							onClick={() => setImgPost(true)}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
							/>
						</svg>
					)}
					{imgPost && (
						<div className="flex flex-row justify-around items-center w-full">
							<input
								type="text"
								placeholder="The link of image."
								onChange={(e) => setValue(e.target.value)}
								className=" w-full"
							/>
							<button
								className="px-5 py-2 mr-2 bg-blue-500 text-white rounded-full hover:bg-blue-400 text-sm"
								onClick={addImg}
							>
								Add
							</button>
							<button
								className="px-5 py-2 mr-4 bg-slate-500 text-white rounded-full hover:bg-slate-400 text-sm"
								onClick={() => setImgPost(false)}
							>
								Cancel
							</button>
						</div>
					)}
					<div className="mx-auto"></div>
					<button className="px-5 py-2 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-400">
						Tweet
					</button>
				</div>
			</div>
		</form>
	);
}
