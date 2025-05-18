const Applicant = require("../models/applicant.model.js");

// Create and Save a new applicant
exports.create = (req, res) => {
  // Create an applicant
  const applicant = new Applicant({
    user: req.body.user,
    // applicant_id: req.body.applicant_id,
    village: req.body.village,
    birthDate: req.body.birth_date,
    experienceLevel: req.body.experienceLevel,
    phone: req.body.phone,
    work: req.body.work,
  });

  // Save applicant in the database
  applicant
    .save()
    .then((data) => {
      res.send({
        message: "Applicant created successfully!",
        applicant: data, // only send the newly created applicant data
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the applicant.",
      });
    });
};

// Retrieve and return all applicants from the database.
exports.findAll = (req, res) => {
  Applicant.find()
    .then((applicants) => {
      res.send(applicants);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving applicants.",
      });
    });
};

// Find a single applicant with an applicantId
exports.findOne = (req, res) => {
  Applicant.findById(req.params.applicantId)
    .then((applicant) => {
      if (!applicant) {
        return res.status(404).send({
          message: "Applicant not found with id " + req.params.applicantId,
        });
      }
      res.send(applicant);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Applicant not found with id " + req.params.applicantId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving applicant with id " + req.params.applicantId,
      });
    });
};

// Update an applicant identified by the applicantId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.user) {
    return res.status(400).send({
      message: "Applicant user name cannot be empty",
    });
  }

  // Find applicant and update it with the request body
  Applicant.findByIdAndUpdate(
    req.params.applicantId,
    {
      user: req.body.user,
      // applicant_id: req.body.applicant_id,
      village: req.body.village,
      birthDate: req.body.birth_date,
      experienceLevel: req.body.experienceLevel,
      phone: req.body.phone,
      work: req.body.work,
    },
    { new: true }
  )
    .then((applicant) => {
      if (!applicant) {
        return res.status(404).send({
          message: "Applicant not found with id " + req.params.applicantId,
        });
      }
      res.send(applicant);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Applicant not found with id " + req.params.applicantId,
        });
      }
      return res.status(500).send({
        message: "Error updating applicant with id " + req.params.applicantId,
      });
    });
};

// Delete an applicant with the specified applicantId in the request
exports.delete = (req, res) => {
  Applicant.findByIdAndRemove(req.params.applicantId)
    .then((applicant) => {
      if (!applicant) {
        return res.status(404).send({
          message: "Applicant not found with id " + req.params.applicantId,
        });
      }
      res.send({ message: "Applicant deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Applicant not found with id " + req.params.applicantId,
        });
      }
      return res.status(500).send({
        message: "Could not delete applicant with id " + req.params.applicantId,
      });
    });
};
