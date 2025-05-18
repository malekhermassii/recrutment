const Offer = require("../models/offer.model.js");

// Create and Save a new offer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Offer name can not be empty",
    });
  }

  // Create an offer
  const offer = new Offer({
    name: req.body.name || "Untitled Offer",
    location: req.body.location,
    post_type: req.body.post_type,
    missions: req.body.missions,
    skills: req.body.skills,
    work_requirements: req.body.work_requirements,
    work_time: req.body.work_time,
    domain: req.body.domain,
    salary: req.body.salary,
    publication_date: req.body.publication_date,
    image: req.body.image,
  });

  // Save offer in the database
  offer
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the offer.",
      });
    });
};

// Retrieve and return all offers from the database.
exports.findAll = (req, res) => {
  Offer.find()
    .then((offers) => {
      res.send(offers);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving offers.",
      });
    });
};

// Find a single offer with an offerId
exports.findOne = (req, res) => {
  Offer.findById(req.params.offerId)
    .then((offer) => {
      if (!offer) {
        return res.status(404).send({
          message: "Offer not found with id " + req.params.offerId,
        });
      }
      res.send(offer);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Offer not found with id " + req.params.offerId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving offer with id " + req.params.offerId,
      });
    });
};

// Update an offer identified by the offerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Offer name can not be empty",
    });
  }

  // Find offer and update it with the request body
  Offer.findByIdAndUpdate(
    req.params.offerId,
    {
      name: req.body.name || "Untitled Offer",
      location: req.body.location,
      post_type: req.body.post_type,
      missions: req.body.missions,
      skills: req.body.skills,
      work_requirements: req.body.work_requirements,
      work_time: req.body.work_time,
      domain: req.body.domain,
      salary: req.body.salary,
      publication_date: req.body.publication_date,
      image: req.body.image,
    },
    { new: true }
  )
    .then((offer) => {
      if (!offer) {
        return res.status(404).send({
          message: "Offer not found with id " + req.params.offerId,
        });
      }
      res.send(offer);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Offer not found with id " + req.params.offerId,
        });
      }
     
    })}
    exports.delete = (req, res) => {
      Offer.findByIdAndRemove(req.params.offerId)
        .then((offer) => {
          if (!offer) {
            return res.status(404).send({
              message: "Offer not found with id " + req.params.offerId,
            });
          }
          res.send({ message: "Offer deleted successfully!" });
        })
        .catch((err) => {
          if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
              message: "Offer not found with id " + req.params.offerId,
            });
          }
          return res.status(500).send({
            message: "Could not delete offer with id " + req.params.offerId,
          });
        });
    };