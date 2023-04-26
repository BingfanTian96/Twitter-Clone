import { useState, useEffect } from "react";
import axios from "axios";

export default function checkLoggedIn() {
	const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('/api/users/isLoggedIn')
        .then(res => {
            setLoggedIn(true);
            setUser(res.data.user);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return { isLoggedIn, user };
}