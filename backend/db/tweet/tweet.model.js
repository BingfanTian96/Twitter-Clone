const mongoose = require("mongoose");

const TweetSchema = require("./tweet.schema").TweetSchema;

const TweetModel = mongoose.model("TweetModel", TweetSchema);

function createTweet(tweet) {
	return TweetModel.create(tweet);
}

function getAllTweet() {
	return TweetModel.find().sort({ createdAt: -1 }).exec();
}

function deleteTweet(tweetId) {
	return TweetModel.deleteOne({ _id: tweetId }).exec();
}

function getTweetByUserId(userId) {
	return TweetModel.find({ author: userId }).sort({ createdAt: -1 }).exec();
}

function getTweetById(id) {
	return TweetModel.findById(id).exec();
}

module.exports = {
	createTweet,
	getAllTweet,
	deleteTweet,
	getTweetByUserId,
	getTweetById,
};
