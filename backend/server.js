const express = require("express");
const tweets = require("./apis/tweet");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const users = require("./apis/user");
// const cookieParser = require("cookie-parser");

const mongoDBEndpoint =
	"mongodb+srv://admin:CS5610@twitter-clone.qzlzgnp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

const session = require('express-session')

// const store = new MongoDBStore({
// 	uri: 'mongodb://localhost:27017/myapp',
// 	collection: 'sessions'
// });
  
app.use(session({
	secret: 'secret-key',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: false }
  }));

app.use("/api/users/", users);
app.use("/api/tweets/", tweets);

let frontend_dir = path.join(__dirname, "..", "frontend", "build");

app.use(express.static(frontend_dir));

app.get("*", function (req, res) {
	console.log("received request");
	res.sendFile(path.join(frontend_dir, "index.html"));
});

app.listen(process.env.PORT || 8000, function () {
	console.log("Starting server now...");
});
