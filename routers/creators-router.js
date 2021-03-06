
require("dotenv").config(); // for reading JWT_SECRET from .env file
const express = require("express");
const router = express.Router();
// const authenticate = require("../middleware/git auth-middleware");
const Creators = require("../models/creators-model");



router.get("/creators", async (req, res, next) => {
  try {
    res.json(await Creators.find());
  } catch (err) {
    next(err);
  }
});

router.get("/creators/:id", async (req, res, next) => {
  try {
    const user = await Creators.findById(req.params.id); // if not account, send 404, otherwise send 200
    if (!user) {
      res.status(404).json({ message: "Creator could not be found with that ID" });
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

router.get("/creators/:id/tutorials", async (req, res, next) => {
  try {
    const creatorId = req.params.id;
    const createdTutorials = await Creators.findAllCreatedTutorials(creatorId); // if not account, send 404, otherwise send 200
    if (!createdTutorials) {
      res
        .status(404)
        .json({ message: "Creator does not have any original tutorials saved to database." });
    } else {
      res.status(200).json(createdTutorials);
    }
  } catch (err) {
    res
      .status(500)
      .json({
        message:
          "Something went wrong, could not find tutorials under/made by this creator account.",
      });
    next(err);
  }
});

// router.get("/creators/:id/tutorials/:id", async (req, res, next) => {
//     try {
//       const creatorId = req.params.id;
//       const createdTutorial = await Creators.findCreatedTutorialById(creatorId); // if not account, send 404, otherwise send 200
//       if (!createdTutorial) {
//         res
//           .status(404)
//           .json({
//             message:
//               "A specific created tutorial could not be found with that ID",
//           });
//       } else {
//         res.status(200).json(createdTutorial);
//       }
//     } catch (err) {
//       res
//         .status(500)
//         .json({
//           message:
//             "Something went wrong, could not find a specific tutorial made by creator using that tutorial ID",
//         });
//       next(err);
//     }
//   }
// );

// edit and delete for the tutorial themselves should only be accessed by creators, you can only delete saved tutorials

router.put("/creators/:id/tutorials/:id", async (req, res, next) => {
    try {
      const changes = req.body;
  
      console.log("this is the tutorial on the id: ", req.params.id);
  
      const updatedCreatorTutorial = await Creators.update(req.params.id, changes);
  
      res.status(204).json(updatedCreatorTutorial);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong, could not update creator's tutorial" });
      next(err);
    }
  });


router.delete("/creators/:id", async (req, res, next) => {
  try {
    await Creators.remove(req.params.id);

    res.status(204).end();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, could not delete user by that ID" });

    next(err);
  }
});

// router.delete("/creators/:id/tutorials/:id", async (req, res, next) => {
//     try {
//       // const savedTutorials = await Creators.findAllSavedTutorials(req.params.id); 
//       // await savedTutorials.removeSavedTutorialbyId(req.params.id);
//         const savedTutorials = await Creators.findAllSavedTutorials(req.params.user_id); 
//         await savedTutorials.removeSavedTutorialbyId(req.params.user_id);

//       res.status(204).end();
//     } catch (err) {
//       res
//         .status(500)
//         .json({ message: "Something went wrong, could not delete saved tutorial from your favorite's list using that id" });

//       next(err);
//     }
//   }
// );


module.exports = router;
