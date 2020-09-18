
// router.put("/users/:id/tutorials/:id", authenticate(), async (req, res, next) => {
//     try {
//       const changes = {
//         vin: req.body.vin,
//         model: req.body.model,
//         make: req.body.make,
//         mileage: req.body.mileage,
//         transType: req.body.transType,
//         titleStatus: req.body.titleStatus,
//       };
  
//       console.log("this is on the id: ", req.params.id);
  
//       const updatedCar = await db.update(req.params.id, changes);
  
//       res.status(204).json(updatedCar);
//     } catch (err) {
//       res
//         .status(500)
//         .json({ message: "Something went wrong, could not update car" });
//       next(err);
//     }
//   });