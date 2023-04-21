import { useState, useEffect } from "react";
import axios from "axios";

export default function useUserInfo(userId) {
	const [userInfo, setUserInfo] = useState(null);
	const [status, setStatus] = useState("loading");

	async function getUserInfo() {
		await axios.get("/api/users/" + userId).then(function (response) {
			setUserInfo(response.data);
			setStatus("pass");
		});
	}
	useEffect(() => {
		getUserInfo();
	}, []);
	return { userInfo, setUserInfo, status };
}
