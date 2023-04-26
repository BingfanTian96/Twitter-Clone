import { useState, useEffect } from "react";
import axios from "axios";

export default function useUserInfo() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const [status, setStatus] = useState("loading");

	async function getUserInfo() {
		await axios.get('/api/users/isLoggedIn',{
			withCredentials: true
		})
		.then(res => {
			setLoggedIn(true);
			setStatus("pass")
			setUserInfo(res.data);
		})
		.catch(err => {
			console.log(err);
			setStatus("checked")
		});
	}
	useEffect(() => {
		getUserInfo();
	}, []);
	return { isLoggedIn, userInfo, setUserInfo, status };
}
