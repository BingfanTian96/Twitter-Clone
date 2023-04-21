const mongoose = require("mongoose");

const TweetSchema = require("./tweet.schema").TweetSchema;

const TweetModel = mongoose.model("TweetModel", TweetSchema);

function createTweet(tweet) {
	return TweetModel.create(tweet);
}

function getAllTweet() {
	return TweetModel.find().sort({ createdAt: -1 }).exec();
}

function getTweetByUserId(userId) {
	return TweetModel.find({ author: userId }).sort({ createdAt: -1 }).exec();
}

function getTweetById(tweetId) {
	return TweetModel.findById({ _id: tweetId }).exec();
}

function deleteTweet(tweetId) {
	return TweetModel.deleteOne({ _id: tweetId }).exec();
}

function updateTweet(tweet) {
	return TweetModel.updateOne({ _id: tweet._id }, tweet).exec();
}

module.exports = {
	createTweet,
	getAllTweet,
	deleteTweet,
	getTweetByUserId,
	getTweetById,
	updateTweet,
};
