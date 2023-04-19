const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

exports.TweetSchema = new Schema(
	{
		author: { type: ObjectId, ref: "user", require: true },
		text: String,
		likesCount: { type: Number, default: 0 },
		commentsCount: { type: Number, default: 0 },
		transmitsCount: { type: Number, default: 0 },
		parent: { type: ObjectId, ref: "tweet" },
		images: { type: [String] },
	},
	{
		timestamps: true,
		collection: "Twitter-clone-tweets",
	}
);
