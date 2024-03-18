const express = require("express");
const app = express();
const authRouter = require("./router/authRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// connect to databse
const connectDatabase = require("./config/databaseConfig.js");

connectDatabase();

// middleware
app.use(cookieParser());
app.use(express.json());
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(
	cors({
		origin: "http://localhost:3000", // Replace with the client's origin
		credentials: true,
	})
);

app.use("/api/auth/", authRouter);

app.use("/", (req, res) => {
	res.status(200).json({ data: "Auth server : server updated" });
});

module.exports = app;
