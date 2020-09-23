require("dotenv").config(); // for reading JWT_SECRET from .env file
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth-middleware"); // call with function
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
    const {id} = req.params;
    const tutorial = await Tutorials.findById(id); // if not account, send 404, otherwise send 200
    if (!tutorial) {
      res.status(404).json({ message: "Tutorial could not be found with that ID" });
    } else {
      res.status(200).json(tutorial);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, could not find tutorial by ID" });
    next(err);
  }
});

// edit and delete for the tutorial themselves should only be accessed by creator, you can only save or delete saved tutorials as a user

router.put('/tutorials/:id', authenticate(), async (req, res, next) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const tutorial = await Tutorials.findById(id); // if not account, send 404, otherwise send 200]
        // if (tutorial.creator_id != req.token.subject) {} else {} // for auth


        if (tutorial) {
            Tutorials.update(changes, id)
            .then(updatedTutorial => {
            res.status(200).json(updatedTutorial);
            console.log("Tutorial uddated")
            });
        } else {
            res.status(404).json({ message: 'Could not find tutorial with the given id' });
        }
      } catch (err) {
        res
          .status(500)
          .json({ message: "Something went wrong, could not update tutorial" });
        next(err);
      }
});

router.delete("/tutorials/:id", async (req, res, next) => {
  try {
    await Tutorials.remove(req.params.id);

    res.status(204).json({ message: "successfully deleted" }).end();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, could not delete tutorial by that ID" });

    next(err);
  }
});

module.exports = router;
