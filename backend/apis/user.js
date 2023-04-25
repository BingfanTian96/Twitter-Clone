const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const UserModel = require("../db/user/user.model");

const userDB = [];

router.get("/", function (request, response) {
	response.send(userDB);
});

router.get("/:id", async function (req, res) {
	const id = req.params.id;

	const userData = await UserModel.findUserById(id);

	return res.send(userData);
});

router.post("/", async function (req, res) {
	const body = req.body;

	const newUserResponse = await UserModel.createUser(body);

	res.send("Created new user!");
});

router.put("/edit", async function (req, res) {
	const newUser = req.body;

	UserModel.updateUser(newUser)
		.then(function (dbResponse) {
			res.send("user Successfully Updated");
		})
		.catch(function (error) {
			res.status(500).send(error);
		});
});

router.post("/login", async function (req, res) {
	const username = req.body.username;
	const password = req.body.password;

	try {
		const createUserResponse = await UserModel.createUser({
			username: username,
			password: password,
		});

		const token = jwt.sign(username, "HUNTERS_PASSWORD");

		res.cookie("username", token);

		return res.send("User created successfully");
	} catch (e) {
		res.status(401).send(null);
	}
});

router.post("/create", async function (req, res) {
	const username = req.body.username;
	const password = req.body.password;

	const createUserResponse = await UserModel.createUser({
		username: username,
		password: password,
	});

	res.cookie("username", username);

	return res.send("User created successfully");
});

router.get("/isLoggedIn", async function (req, res) {
	const username = req.cookies.username;

	if (!username) {
		return res.send({ username: null });
	}
	let decryptedUsername;
	try {
		decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
	} catch (e) {
		return res.send({ username: null });
	}

	if (!decryptedUsername) {
		return res.send({ username: null });
	} else {
		return res.send({ username: decryptedUsername });
	}
});

router.post("/logOut", async function (req, res) {
	res.cookie("username", "", {
		maxAge: 0,
	});

	res.send(true);
});

module.exports = router;
