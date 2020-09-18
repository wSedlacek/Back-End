require("dotenv").config(); // for reading JWT_SECRET from .env file

const express = require("express");
const router = express.Router();
// const authenticate = require("../middleware/auth-middleware");

const Users = require("../models/users-model");



router.get("/users", async (req, res, next) => {
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
