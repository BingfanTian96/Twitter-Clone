import "../css/App.css";
import ProfilePill from "./profilePill.js";
import MenuItem from "./menuItem.js";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SideBar({ isLogin, curUser }) {
	async function logOut() {
		await axios
			.post("/api/users/logOut", 
			{
				username: curUser?.username,
			},
			{
				withCredentials: true,
			})
			.then((res) => {})
			.catch((err) => {
				console.log(err);
			});
		window.location.reload();
	}

	return (
		<div className="flex flex-col w-1/4 h-full justify-start items-start px-10 bg-white">
			{/*  twitter icon */}
			<img
				src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
				alt="twitter-icon"
				className=" w-12 pb-5 pt-3"
			/>

			{/* To home page */}
			<Link to={"/"}>
				<MenuItem
					icon={
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
								d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
							/>
						</svg>
					}
					title="Home"
				/>
			</Link>

			{/* To profile page */}
			{isLogin && curUser ? (
				<Link to={"/user/" + curUser._id}>
					<MenuItem
						icon={
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
									d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						}
						title="Profile"
					/>
				</Link>
			) : null}

			{/* To log in page */}
			{!isLogin ? (
				<Link to="/login">
					<MenuItem
						icon={
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
									d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
								/>
							</svg>
						}
						title="Log In"
					/>
				</Link>
			) : null}

			{/* Log out */}
			{isLogin ? (
				<button onClick={logOut}>
					<MenuItem
						icon={
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
									d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
								/>
							</svg>
						}
						title="Log Out"
					/>
				</button>
			) : null}

			{/* To sign up page */}
			{!isLogin ? (
				<Link to="/signup">
					<MenuItem
						icon={
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
									d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
								/>
							</svg>
						}
						title="Sign Up"
					/>
				</Link>
			) : null}

			<div className="flex-1"></div>
			{/* To profile page */}
			{isLogin ? (
				<Link to={"/user/" + curUser._id}>
					<ProfilePill curUser={curUser} />
				</Link>
			) : null}
		</div>
	);
}
