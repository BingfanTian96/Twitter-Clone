const Schema = require("mongoose").Schema;

exports.UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
		},
		password: String,
		name: String,
		img: String,
		about: String,
	},
	{ timestamps: true, collection: "Twitter-clone-users" }
);

// // Save is a MongoDB API, that is called by 'create'
// UserSchema.pre("save", function(next) {
//     // this logic below allows us to protect the password
//     // in the case of a user update, but
//     // where the password
//     if(!this.isModified("password")) {
//         return next();
//     }
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
// });

// UserSchema.methods.comparePassword = function(plaintext, callback) {
//     return callback(null, bcrypt.compareSync(plaintext, this.password));
// };