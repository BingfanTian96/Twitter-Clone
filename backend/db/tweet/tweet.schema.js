const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

exports.TweetSchema = new Schema(
	{
		author: { type: ObjectId, ref: "user", require: true },
		text: { type: String, ref: "user", require: true },
		likesCount: { type: Number, default: 0 },
		commentsCount: { type: Number, default: 0 },
		transmitsCount: { type: Number, default: 0 },
		images: { type: [String], default: [] },
	},
	{
		timestamps: true,
		collection: "Twitter-clone-tweets",
	}
);
