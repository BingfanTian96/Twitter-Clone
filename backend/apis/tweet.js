const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const TweetModel = require("../db/tweet/tweet.model");

//      author: { type: mongoose.Types.ObjectId, ref: "user", require: true },
// 		text: String,
// 		likesCount: { type: Number, default: 0 },
// 		commentsCount: { type: Number, default: 0 },
// 		parent: { type: mongoose.Types.ObjectId, ref: "tweet" },
// 		images: { type: [String] },

router.get("/", function (req, res) {
	TweetModel.getAllTweet()
		.then(function (dbResponse) {
			res.cookie("tweetCount", dbResponse.length + 1);
			res.send(dbResponse);
		})
		.catch(function (error) {
			res.status(500).send(error);
		});
});

// /?tweetId={tweetId}
// get a tweet by a tweetId
router.get("/:id", async function (req, res) {
	const id = req.params.id;
	// req.query.something
	// const userData = await TweetModel.getTweetById(id);
	// return res.send(userData);
	TweetModel.getTweetById(id)
		.then(function (dbResponse) {
			res.cookie("tweetCount", dbResponse.length + 1);
			res.send(dbResponse);
		})
		.catch(function (error) {
			res.status(500).send(error);
		});
});

// get all tweets created by a user
router.get("/userId/:id", function (req, res) {
	const id = req.params.id;
	TweetModel.getTweetByUserId(id)
		.then(function (dbResponse) {
			res.cookie("tweetCount", dbResponse.length + 1);
			res.send(dbResponse);
		})
		.catch(function (error) {
			res.status(500).send(error);
		});
});

router.post("/", function (req, res) {
	const newTweet = req.body;
	TweetModel.createTweet(newTweet)
		.then(function (dbResponse) {
			res.send("Tweet Successfully Created");
		})
		.catch(function (error) {
			res.status(500).send(error);
		});
});

router.put("/edit", function (req, res) {
	const newTweet = req.body;
	TweetModel.updateTweet(newTweet)
		.then(function (dbResponse) {
			res.send("Tweet Successfully Updated");
		})
		.catch(function (error) {
			res.status(500).send(error);
		});
});

router.delete("/:id", function (req, res) {
	const id = req.params.id;
	TweetModel.deleteTweet(id).then(function () {
		res.send("Tweet Successfully deleted");
	});
});

module.exports = router;
