//job
const Job = require("../models/job.model.js");

// Create and Save a new job
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Job title can not be empty",
    });
  }

  // Create a job
  const job = new Job({
    title: req.body.title || "Untitled Job",
    locationAddress: req.body.locationAddress,
    postType: req.body.postType,
    missions: req.body.missions,
    skills: req.body.skills,
    workRequirements: req.body.workRequirements,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    domain: req.body.domain,
    salary: req.body.salary,
    postDate: req.body.postDate,
    image: req.file ? req.file.filename : null, // Use the uploaded filename if a file was uploaded
  });

  // Save job in the database
  job
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the job.",
      });
    });
};

// Retrieve and return all jobs from the database.
exports.findAll = (req, res) => {
  Job.find()
    .then((jobs) => {
      res.send(jobs);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving jobs.",
      });
    });
};

// Find a single job with a jobId
exports.findOne = (req, res) => {
  Job.findById(req.params.jobId)
    .then((job) => {
      if (!job) {
        return res.status(404).send({
          message: "Job not found with id " + req.params.jobId,
        });
      }
      res.send(job);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Job not found with id " + req.params.jobId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving job with id " + req.params.jobId,
      });
    });
};

// Update a job identified by the jobId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Job title can not be empty",
    });
  }

  // Find job and update it with the request body
  Job.findByIdAndUpdate(
    req.params.jobId,
    {
      title: req.body.title || "Untitled Job",
      locationAddress: req.body.locationAddress,
      postType: req.body.postType,
      missions: req.body.missions,
      skills: req.body.skills,
      workRequirements: req.body.workRequirements,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      domain: req.body.domain,
      salary: req.body.salary,
      postDate: req.body.postDate,
      image: req.file ? req.file.filename : null,
    },
    { new: true }
  )
    .then((job) => {
      if (!job) {
        return res.status(404).send({
          message: "Job not found with id " + req.params.jobId,
        });
      }
      res.send(job);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Job not found with id " + req.params.jobId,});
        }
     return res.status(500).send({
            message: "Error updating product with id " + req.params.jobId,
          });
        
        });}
// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  Job.findByIdAndRemove(req.params.jobId)
    .then((job) => {
      if (!job) {
        return res.status(404).json({
          message: "Job not found with id " + req.params.jobId,
        });
      }
      res.status(200).json({ message: "Job deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).json({
          message: "Job not found with id " + req.params.jobId,
        });
      }
      return res.status(500).json({
        message: "Could not delete job with id " + req.params.jobId,
      });
    });
};
