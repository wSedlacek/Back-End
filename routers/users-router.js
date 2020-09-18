require("dotenv").config(); // for reading JWT_SECRET from .env file

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/auth-middleware");
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

router.get("/users", authenticate(), async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id); // if not account, send 404, otherwise send 200
    if (!user) {
      res.status(404).json({ message: "User could not be found with that ID" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, could not find user by ID" });
    next(err);
  }
});

router.get("/users/:id/tutorials", async (req, res, next) => {
  try {
    const savedTutorials = await Users.findAllSavedTutorials(req.params.id); // if not account, send 404, otherwise send 200
    if (!savedTutorials) {
      res
        .status(404)
        .json({ message: "User does not have any tutorials saved." });
    } else {
      res.status(200).json(savedTutorials);
    }
  } catch (err) {
    res
      .status(500)
      .json({
        message:
          "Something went wrong, could not find tutorials under/made by this user.",
      });
    next(err);
  }
});

router.get("/users/:id/tutorials/:id", async (req, res, next) => {
    try {
      const savedTutorial = await Users.findSavedTutorialById(req.params.id); // if not account, send 404, otherwise send 200
      if (!savedTutorial) {
        res
          .status(404)
          .json({
            message:
              "A specific saved tutorial could not be found with that ID",
          });
      } else {
        res.status(200).json(savedTutorial);
      }
    } catch (err) {
      res
        .status(500)
        .json({
          message:
            "Something went wrong, could not find a specific tutorial saved to user by ID",
        });
      next(err);
    }
  }
);

// edit and delete for the tutorial themselves should only be accessed by creators, you can only delete saved tutorials


router.delete("/users/:id", async (req, res, next) => {
  try {
    await Users.remove(req.params.id);

    res.status(204).end();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, could not delete user by that ID" });

    next(err);
  }
});

router.delete("/users/:id/tutorials/:id", async (req, res, next) => {
    try {
        const savedTutorials = await Users.findAllSavedTutorials(req.params.id); 
        await savedTutorials.removeSavedTutorialbyId(req.params.id);

      res.status(204).end();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong, could not delete saved tutorial from your favorite's list using that id" });

      next(err);
    }
  }
);

 


router.get("/logout", async (req, res, next) => {
  req.session.destroy(err => {
  	if (err) {
  		next(err);
  	} else {
  		res.json({
  			message: "Successfully logged out!"
  		});
  	}
  });
});

module.exports = router;
