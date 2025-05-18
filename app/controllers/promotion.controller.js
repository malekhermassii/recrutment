const Promotion = require("../models/promotion.model.js");
const Employee = require("../models/employee.model.js");

// Create and Save a new promotion
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.promotedEmployee) {
    return res.status(400).send({
      message: "Promoted employee name can not be empty",
    });
  }

  try {
    // Find the promoted employee by name
    const promotedEmployee = await Employee.findOne({
      name: req.body.promotedEmployee,
    });

    if (!promotedEmployee) {
      return res.status(404).send({
        message: "Promoted employee not found with name " + req.body.promotedEmployee,
      });
    }

    // Create a promotion
    const promotion = new Promotion({
      promotedEmployee: promotedEmployee._id,
      oldPosition: req.body.oldPosition,
      newPosition: req.body.newPosition,
    });

    // Save promotion in the database
    const savedPromotion = await promotion.save();
    res.send(savedPromotion);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the promotion.",
    });
  }
};

// Retrieve and return all promotions from the database.
exports.findAll = (req, res) => {
  Promotion.find()
    .populate("promotedEmployee")
    .then((promotions) => {
      res.send(promotions);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving promotions.",
      });
    });
};

// Find a single promotion with a promotionId
exports.findOne = (req, res) => {
  Promotion.findById(req.params.promotionId)
    .populate("promotedEmployee")
    .then((promotion) => {
      if (!promotion) {
        return res.status(404).send({
          message: "Promotion not found with id " + req.params.promotionId,
        });
      }
      res.send(promotion);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Promotion not found with id " + req.params.promotionId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving promotion with id " + req.params.promotionId,
      });
    });
};

// Update a promotion identified by the promotionId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.promotedEmployee) {
    return res.status(400).send({
      message: "Promoted employee name can not be empty",
    });
  }

  // Find the promoted employee by name
  Employee.findOne({ name: req.body.promotedEmployee })
    .then((promotedEmployee) => {
      if (!promotedEmployee) {
        return res.status(404).send({
          message: "Promoted employee not found with name " + req.body.promotedEmployee,
        });
      }

      // Find promotion and update it with the request body
      Promotion.findByIdAndUpdate(
        req.params.promotionId,
        {
          promotedEmployee: promotedEmployee._id,
          oldPosition: req.body.oldPosition,
          newPosition: req.body.newPosition,
        },
        { new: true }
      )
        .then((promotion) => {
          if (!promotion) {
            return res.status(404).send({
              message: "Promotion not found with id " + req.params.promotionId,
            });
          }
          res.send(promotion);
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              message: "Promotion not found with id " + req.params.promotionId,
            });
          }
          return res.status(500).send({
            message: "Error updating promotion with id " + req.params.promotionId,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error finding promoted employee: " + err.message,
      });
    });
};

// Delete a promotion with the specified promotionId in the request
exports.delete = (req, res) => {
  Promotion.findByIdAndRemove(req.params.promotionId)
    .then((promotion) => {
      if (!promotion) {
        return res.status(404).send({
          message: "Promotion not found with id " + req.params.promotionId,
        });
      }
      res.send({ message: "Promotion deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Promotion not found with id " + req.params.promotionId,
        });
      }
      return res.status(500).send({
        message: "Could not delete promotion with id " + req.params.promotionId,
      });
    });
};
