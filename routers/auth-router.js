require("dotenv").config(); // for reading JWT_SECRET from .env file
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const Users = require("../models/users-model");


router.post("/register", async (req, res, next) => {
    try {
      const { username } = req.body;
      const user = await Users.findBy({ username }).first();
  
      if (user) {
        return res.status(400).json({
          message: "Username is already taken",
        });
      }
      console.log("req.body: ", req.body);
  
      res.status(201).json(await Users.add(req.body));
      // const newUser = await model.addUser({
      //     username,
      //     password: await bcrypt.hash(password, 14)
      //   })
    
      //   if (newUser) {
      //     res.status(201).json({
      //       message: 'User created'
      //     })
      //   }
  
      // res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  });
  
  router.post("/login", async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await Users.findBy({ username }).first();
      if (!user) {
        return res.status(401).json({
          message: "Invalid Credentials",
        });
      }
  
      // compares plain text pw from req body to the hash stored in the db, returns true/false
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res.status(401).json({
          message: "invalid credentials",
        });
      }
  
      // jwt
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