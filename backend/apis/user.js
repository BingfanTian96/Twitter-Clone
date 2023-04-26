const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserModel = require("../db/user/user.model");

const userDB = [];

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

router.get("/", function (request, response) {
	response.send(userDB);
});

router.get("/isLoggedIn", function (req, res) {
	console.log("is LoggedIn:" + req.session.user);
	if (req.session.user) {
		// user is logged in, fetch user data and send it back
		UserModel.findUserByUsername(req.session.user)
			.then((user)=> {
				if (!user) {
					res.status(404).send('User not found');
				} else {
					console.log("I sent user data to client!!!")
					res.send(user);
				}
			})
		  	.catch((err) =>{
				console.error(err);
			});
	} else {
		// user is not logged in, return 401 Unauthorized
		res.status(401).send('Not authenticated');
	}
});

router.get("/:id", function (req, res) {
	const id = req.params.id;
	UserModel.findUserById(id)
		.then((user) => {
			if (!user) return res.status(400).send("User not found");
			else res.send(user);
		})
		.catch((error) => {
			res.status(500).send(error);
		})
});

router.post("/login", async function (req, res) {
	const username = req.body.username;

	UserModel.findUserByUsername(username)
		.then((user) => {
			
			if (bcrypt.compareSync(req.body.password, user.password)) {
				req.session.user = username;
				return res.cookie('connect.sid', req.session.id).status(200).send({user});
			} else return res.status(400).send("The password does not match");
			
		})
	
		.catch ((error) => {
			console.error(`Something went wrong: ${error}`);
			res.status(500).send(null);
		});
});

router.post("/signup", async function (req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;
	const name = req.body.name;
	const img = req.body.img;
	try {
		const createUserResponse = await UserModel.createUser({
			username: username,
			password: bcrypt.hashSync(password, 10),
			email: email,
			name: name,
			img: img
		});
		req.session.user = username;
		return res.send("User created successfully");
	} catch(error) {
		console.log('Error creating user:', error);
	}
});

router.post("/logOut", async function (req, res) {
	req.session.destroy(err => {
		if (err) {
			console.error(err);
			res.status(500).send('Internal server error');
		} else {
			// Clear the session cookie from the client-side
			res.clearCookie('connect.sid', { path: '/' });
			res.status(200).send('Logout successful');
		}
  	});
});

module.exports = router;
