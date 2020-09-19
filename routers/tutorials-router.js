require("dotenv").config(); // for reading JWT_SECRET from .env file
const express = require("express");
const router = express.Router();
// const authenticate = require("../middleware/git auth-middleware");
const Tutorials = require("../models/tutorials-model");



router.get("/tutorials", async (req, res, next) => {
  try {
    res.json(await Tutorials.find());
  } catch (err) {
    next(err);
  }
});

router.get("/tutorials/:id", async (req, res, next) => {
  try {
    const tutorial = await Tutorials.findById(req.params.id); // if not account, send 404, otherwise send 200
    if (!tutorial) {
      res.status(404).json({ message: "Tutorial could not be found with that ID" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, could not find tutorial by ID" });
    next(err);
  }
});

// edit and delete for the tutorial themselves should only be accessed by creator, you can only save or delete saved tutorials as a user

router.delete("/tutorials/:id", async (req, res, next) => {
  try {
    await Tutorials.remove(req.params.id);

    res.status(204).json({ message: "successfully deleted" }).end();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, could not delete user by that ID" });

    next(err);
  }
});

router.delete("/Tutorials/:id/tutorials/:id", async (req, res, next) => {
    try {
        const savedTutorials = await Tutorials.findAllSavedTutorials(req.params.id); 
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


module.exports = router;
