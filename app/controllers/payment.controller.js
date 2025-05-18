//payment
const Payment = require("../models/payment.model.js");

// Create and Save a new payment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.employee) {
    return res.status(400).send({
      message: "Employee name can not be empty",
    });
  }

  // Create a payment
  const payment = new Payment({
    employee: req.body.employee,
    salary: req.body.salary,
    paymentDate: req.body.paymentDate || new Date(),
  });

  // Save payment in the database
  payment
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the payment.",
      });
    });
};

// Retrieve and return all payments from the database.
exports.findAll = (req, res) => {
  Payment.find()
    .then((payments) => {
      res.send(payments);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving payments.",
      });
    });
};

// Find a single payment with a paymentId
exports.findOne = (req, res) => {
  Payment.findById(req.params.paymentId)
    .then((payment) => {
      if (!payment) {
        return res.status(404).send({
          message: "Payment not found with id " + req.params.paymentId,
        });
      }
      res.send(payment);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Payment not found with id " + req.params.paymentId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving payment with id " + req.params.paymentId,
      });
    });
};

// Update a payment identified by the paymentId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.employee) {
    return res.status(400).send({
      message: "Employee name can not be empty",
    });
  }

  // Find payment and update it with the request body
  Payment.findByIdAndUpdate(
    req.params.paymentId,
    {
      employee: req.body.employee,
      salary: req.body.salary,
      paymentDate: req.body.paymentDate || new Date(),
    },
    { new: true }
  )
    .then((payment) => {
      if (!payment) {
        return res.status(404).send({
          message: "Payment not found with id " + req.params.paymentId,
        });
      }
      res.send(payment);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Payment not found with id " + req.params.paymentId,
        });
      }
      return res.status(500).send({
        message: "Error updating payment with id " + req.params.paymentId,
      });
    });
};

// Delete a payment with the specified paymentId in the request
exports.delete = (req, res) => {
  Payment.findByIdAndRemove(req.params.paymentId)
    .then((payment) => {
      if (!payment) {
        return res.status(404).send({
          message: "Payment not found with id " + req.params.paymentId,
        });
      }
      res.send({ message: "Payment deleted successfully!"});
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId,
      });
    });
};
