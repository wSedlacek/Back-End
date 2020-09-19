require("dotenv").config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require("cookie-parser")

const authRouter = require('../routers/auth-router');
const usersRouter = require('../routers/users-router');
// const creatorsRouter = require('../routers/creators-router');
const tutorialsRouter = require('../routers/tutorials-router');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser());

server.use('/api', authRouter);  
server.use('/api', usersRouter);  
// server.use('/api', creatorsRouter); 
server.use('/api/tutorials', tutorialsRouter);  


server.get("/", (req, res) => {
	res.json({
		message: "Welcome to the backend of this How-To BW project",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went totally wrong, it's our bad, server-side",
	})
})

module.exports = server;
