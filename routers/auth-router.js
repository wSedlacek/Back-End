require("dotenv").config(); // for reading JWT_SECRET from .env file
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const Users = require("../models/users-model");

const router = express.Router();

router.post("/register", async (req, res, next) => {
    try {
      const { username } = req.body;
      const user = await Users.findBy({ username }).first();
  
      if (user) {
        return res.status(400).json({
          message: "Username is already taken",
        });
      }
  
      res.status(201).json(await Users.add(req.body));
    } catch (err) {
      next(err);
    }
  });
  
  router.post("/login", async (req, res, next) => {
    const authErr = {
        message: "Invalid Credentials",
    }

    try {
      const { username, password } = req.body;
      const user = await Users.findBy({ username }).first();
      if (!user) {
        return res.status(401).json(authErr);
      }
      
      // compares plain text pw from req body to the hash stored in the db, returns true/false
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res.status(401).json(authErr);
      }
  
      // generate a new JSON web token
      const token = generateToken(user)
      res.cookie('token', token)
  
      res.json({
        message: `Welcome ${user.username}!`,
      });
    } catch (err) {
      next(err);
    }
  });
  
  function generateToken(user) {
      const payload = {
      //   id: user.id,
        username: user.username,
        password: user.password
      }
      return jwt.sign(payload, process.env.JWT_SECRET)
    }

  // router.get("/logout", async (req, res, next) => {
  //   req.session.destroy(err => {
  //   	if (err) {
  //   		next(err);
  //   	} else {
  //   		res.json({
  //   			message: "Successfully logged out!"
  //   		});
  //   	}
  //   });
  // });

    module.exports = router;