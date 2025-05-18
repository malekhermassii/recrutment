//reward 
const Reward = require("../models/reward.model.js");

// Create and Save a new reward
exports.create = (req, res) => {
  // Validate request
  if (!req.body.rewardedEmployee) {
    return res.status(400).send({
      message: "Rewarded employee name can not be empty",
    });
  }

  // Create a reward
  const reward = new Reward({
    reward: req.body.reward,
    rewardReason: req.body.rewardReason,
    rewardedEmployee: req.body.rewardedEmployee,
    rewardDate: req.body.rewardDate || new Date(),
  });

  // Save reward in the database
  reward
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the reward.",
      });
    });
};

// Retrieve and return all rewards from the database.
exports.findAll = (req, res) => {
  Reward.find()
    .then((rewards) => {
      res.send(rewards);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving rewards.",
      });
    });
};

// Find a single reward with a rewardId
exports.findOne = (req, res) => {
  Reward.findById(req.params.rewardId)
    .then((reward) => {
      if (!reward) {
        return res.status(404).send({
          message: "Reward not found with id " + req.params.rewardId,
        });
      }
      res.send(reward);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Reward not found with id " + req.params.rewardId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving reward with id " + req.params.rewardId,
      });
    });
};

// Update a reward identified by the rewardId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.rewardedEmployee) {
    return res.status(400).send({
      message: "Rewarded employee name can not be empty",
    });
  }

  // Find reward and update it with the request body
  Reward.findByIdAndUpdate(
    req.params.rewardId,
    {
      reward: req.body.reward,
      rewardReason: req.body.rewardReason,
      rewardedEmployee: req.body.rewardedEmployee,
      rewardDate: req.body.rewardDate || new Date(),
    },
    { new: true }
  )
    .then((reward) => {
      if (!reward) {
        return res.status(404).send({
          message: "Reward not found with id " + req.params.rewardId,
        });
      }
      res.send(reward);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Reward not found with id " + req.params.rewardId,
        });
      }
      return res.status(500).send({
        message: "Error updating reward with id " + req.params.rewardId,
      });
    });
};

// Delete a reward with the specified rewardId in the request
exports.delete = (req, res) => {
  Reward.findByIdAndRemove(req.params.rewardId)
    .then((reward) => {
      if (!reward) {
        return res.status(404).send({
          message: "Reward not found with id " + req.params.rewardId,
        });
      }
      res.send({ message: "reward deleted successfully!"});
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "reward not found with id " + req.params.rewardId,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.rewardId,
      });
    });
};
