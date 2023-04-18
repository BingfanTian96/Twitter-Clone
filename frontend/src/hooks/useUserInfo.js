import { useState } from "react";

export default function useUserInfo(userId, sessionStatus) {
	const [userInfo, setUserInfo] = useState(null);
	const [status, setStatus] = useState("loading");

	function getUserInfo() {
		if (sessionStatus === "loading") {
			return;
		}
		if (sessionStatus === "unauthenticated") {
			setStatus("unauthenticated");
			return;
		}
		console.log("fetch");
		fetch("/api/users/" + userId).then((response) => {
			response.json().then((json) => {
				setUserInfo(json.user);
				setStatus("authenticated");
			});
		});
	}
	useEffect(() => {
		getUserInfo();
	}, [sessionStatus]);
	return { userInfo, setUserInfo, status };
}
