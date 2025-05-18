//policies
const Policy = require("../models/policy.model.js");

// Create and Save a new policy
exports.create = (req, res) => {
  // Create a policy
  const policy = new Policy({
    policyTitle: req.body.policyTitle,
    policyDescription: req.body.policyDescription,
  });

  // Save policy in the database
  policy
    .save()
    .then((data) => {
      res.send({
        message: "Policy created successfully!",
        policy: data, // only send the newly created policy data
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the policy.",
      });
    });
};


// Retrieve and return all policies from the database.
exports.findAll = (req, res) => {
  Policy.find()
    .then((policies) => {
      res.send(policies);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving policies.",
      });
    });
};

// Find a single policy with a policyId
exports.findOne = (req, res) => {
  Policy.findById(req.params.policyId)
    .then((policy) => {
      if (!policy) {
        return res.status(404).send({
          message: "Policy not found with id " + req.params.policyId,
        });
      }
      res.send(policy);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Policy not found with id " + req.params.policyId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving policy with id " + req.params.policyId,
      });
    });
};

// Update a policy identified by the policyId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.policyTitle) {
    return res.status(400).send({
      message: "policy Title name can not be empty",
    });
  }

  // Find policy and update it with the request body
  Policy.findByIdAndUpdate(
    req.params.policyId,
    {
      policyTitle: req.body.policyTitle,
      policyDescription: req.body.policyDescription,
      rewardedEmployee: req.body.rewardedEmployee,
      policyDate: req.body.policyDate || new Date(),
    },
    { new: true }
  )
    .then((policy) => {
      if (!policy) {
        return res.status(404).send({
          message: "Policy not found with id " + req.params.policyId,
        });
      }
      res.send(policy);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Policy not found with id " + req.params.policyId,
        });
      }
      return res.status(500).send({
        message: "Error updating policy with id " + req.params.policyId,
      });
    });
};

// Delete a policy with the specified policyId in the request

exports.delete = (req, res) => {
  Policy.findByIdAndRemove(req.params.policyId)
    .then((policy) => {
      if (!policy) {
        return res.status(404).json({
          message: "policy not found with id " + req.params.policyId,
        });
      }
      res.status(200).json({ message: "policy deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).json({
          message: "policy not found with id " + req.params.policyId,
        });
      }
      return res.status(500).json({
        message: "Could not delete policy with id " + req.params.policyId,
      });
    });
};
