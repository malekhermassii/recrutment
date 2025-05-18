const Interview = require("../models/interview.model.js");
const Applicant = require("../models/applicant.model.js");

// Create and Save a new interview
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.candidate) {
    return res.status(400).send({
      message: "Candidate name cannot be empty",
    });
  }

  try {
    // Find the applicant by name
    const applicant = await Applicant.findOne({ user: req.body.candidate });

    if (!applicant) {
      return res.status(404).send({
        message: "Applicant not found with name " + req.body.candidate,
      });
    }

    // Create an interview
    const interview = new Interview({
      candidate: applicant,
      date: req.body.date,
    });

    // Save the interview in the database
    const savedInterview = await interview.save();

    res.send(savedInterview);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the interview.",
    });
  }
};


// Retrieve and return all interviews from the database.
exports.findAll = (req, res) => {
  Interview.find()
  .populate("candidate")
    .then((interviews) => {
      res.send(interviews);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving interviews.",
      });
    });
};

exports.findOne = (req, res) => {
  Interview.findById(req.params.interviewId)
    .populate("candidate")
    .then((interview) => {
      if (!interview) {
        return res.status(404).send({
          message: "Interview not found with id " + req.params.interviewId,
        });
      }
      
      res.send(interview);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Interview not found with id " + req.params.interviewId,
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving interview with id " + req.params.interviewId,
      });
    });
};

// Update an interview identified by the interviewId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.candidate) {
    return res.status(400).send({
      message: "Candidate name can not be empty",
    });
  }
  
  // Find interview and update it with the request body
  Interview.findByIdAndUpdate(
    req.params.interviewId,
    {
      candidate: req.body.candidate || "Untitled Candidate",
      date: req.body.date,
    },
    { new: true }
  )
    .then((interview) => {
      if (!interview) {
        return res.status(404).send({
          message: "Interview not found with id " + req.params.interviewId,
        });
      }
      res.send(interview);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Interview not found with id " + req.params.interviewId,
        });
      }
      return res.status(500).send({
        message:
          "Error updating interview with id " + req.params.interviewId,
      });
    });
};


// Delete an interview with the specified interviewId in the request
exports.delete = (req, res) => {
    Interview.findByIdAndRemove(req.params.interviewId)
      .then((interview) => {
        if (!interview) {
          return res.status(404).send({
            message: "Interview not found with id " + req.params.interviewId,
          });
        }
        res.send({ message: "Interview deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "Interview not found with id " + req.params.interviewId,
          });
        }
        return res.status(500).send({
          message: "Could not delete interview with id " + req.params.interviewId,
        });
      });
  };
  
// new



// const Interview = require("../models/interview.model.js");

// // Create and Save a new interview
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.candidate) {
//     return res.status(400).send({
//       message: "Candidate name can not be empty",
//     });
//   }

//   // Create an interview
//   const interview = new Interview({
//     candidate: req.body.candidate || "Untitled Candidate",
//     date: req.body.date,
//   });

//   // Save interview in the database
//   interview
//     .save()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the interview.",
//       });
//     });
// };

// // Retrieve and return all interviews from the database.
// exports.findAll = (req, res) => {
//   Interview.find()
//     .then((interviews) => {
//       res.send(interviews);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving interviews.",
//       });
//     });
// };

// // Find a single interview with an interviewId
// exports.findOne = (req, res) => {
//   Interview.findById(req.params.interviewId)
//     .then((interview) => {
//       if (!interview) {
//         return res.status(404).send({
//           message: "Interview not found with id " + req.params.interviewId,
//         });
//       }
//       res.send(interview);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "Interview not found with id " + req.params.interviewId,
//         });
//       }
//       return res.status(500).send({
//         message:
//           "Error retrieving interview with id " + req.params.interviewId,
//       });
//     });
// };

// // Update an interview identified by the interviewId in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body.candidate) {
//     return res.status(400).send({
//       message: "Candidate name can not be empty",
//     });
//   }

//   // Find interview and update it with the request body
//   Interview.findByIdAndUpdate(
//     req.params.interviewId,
//     {
//       candidate: req.body.candidate || "Untitled Candidate",
//       date: req.body.date,
//     },
//     { new: true }
//   )
//     .then((interview) => {
//       if (!interview) {
//         return res.status(404).send({
//           message: "Interview not found with id " + req.params.interviewId,
//         });
//       }
//       res.send(interview);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "Interview not found with id " + req.params.interviewId,
//         });
//       }
//       return res.status(500).send({
//         message:
//           "Error updating interview with id " + req.params.interviewId,
//       });
//     });
// };

// // Delete an interview with the specified interviewId in the request
// exports.delete = (req, res) => {
//     Interview.findByIdAndRemove(req.params.interviewId)
//       .then((interview) => {
//         if (!interview) {
//           return res.status(404).send({
//             message: "Interview not found with id " + req.params.interviewId,
//           });
//         }
//         res.send({ message: "Interview deleted successfully!" });
//       })
//       .catch((err) => {
//         if (err.kind === "ObjectId" || err.name === "NotFound") {
//           return res.status(404).send({
//             message: "Interview not found with id " + req.params.interviewId,
//           });
//         }
//         return res.status(500).send({
//           message: "Could not delete interview with id " + req.params.interviewId,
//         });
//       });
//   };
  
   
  