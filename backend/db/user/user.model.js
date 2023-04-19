const mongoose = require("mongoose");

const UserSchema = require("./user.schema").UserSchema;

const UserModel = mongoose.model("UserModel", UserSchema);

function createUser(user) {
	return UserModel.create(user);
}

function findUserByUsername(username) {
	return UserModel.find({ username: username }).exec();
}

function findUserById(id) {
	return UserModel.findById({ _id: id }).exec();
}

module.exports = {
	createUser,
	findUserByUsername,
	findUserById,
};
