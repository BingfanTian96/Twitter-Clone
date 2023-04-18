import { useState, useEffect } from "react";
import axios from "axios";

export default function useUserInfo(userId, sessionStatus) {
	const [userInfo, setUserInfo] = useState(null);
	const [status, setStatus] = useState("loading");

	async function getUserInfo() {
		if (sessionStatus === "loading") {
			return;
		}
		if (sessionStatus === "unauthenticated") {
			setStatus("unauthenticated");
			return;
		}
		const response = await axios.get("/api/users/" + userId);
		setUserInfo(response.data);
		setStatus("authenticated");
		console.log(userInfo);
	}
	useEffect(() => {
		getUserInfo();
	}, [sessionStatus]);
	return { userInfo, setUserInfo, status };
}
