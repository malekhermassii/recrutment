//
const Employee = require("../models/employee.model.js");

// Create and Save a new employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name && !req.body.payment) {
    return res.status(400).send({
      message: "Employee name can not be empty",
    });
  }

  // Create an employee
  const employee = new Employee({
    name: req.body.name || "Untitled Employee",
    email: req.body.email,
    gender: req.body.gender,
    image: req.body.image,
    city: req.body.city,
    salary: req.body.salary,
    payment: req.body.payment,
    position : req.body.position,
    phone : req.body.phone, 
  });

  // Save employee in the database
  employee
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee.",
      });
    });
};

// Retrieve and return all employees from the database.
exports.findAll = (req, res) => {
  Employee.find()
    .then((employees) => {
      res.send(employees);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees.",
      });
    });
};

// Find a single employee with an employeeId
exports.findOne = (req, res) => {
  Employee.findById(req.params.employeeId)
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      res.send(employee);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving employee with id " + req.params.employeeId,
      });
    });
};

// Update an employee identified by the employeeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Employee name can not be empty",
    });
  }

  // Find employee and update it with the request body
  Employee.findByIdAndUpdate(
    req.params.employeeId,
    {
      name: req.body.name || "Untitled Employee",
      email: req.body.email,
      gender: req.body.gender,
      image: req.body.image,
      city: req.body.city,
      salary: req.body.salary,
      payment: req.body.payment,
      phone : req.body.phone,
      position : req.body.position,
    },
    { new: true }
  )
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      res.send(employee);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      return res.status(500).send({
        message: "Error updating employee with id " + req.params.employeeId,
      });
    });
};
exports.delete = (req, res) => {
Employee.findByIdAndRemove(req.params.employeeId)
.then((employee) => {
if (!employee) {
return res.status(404).send({
message: "Employee not found with id " + req.params.employeeId,
});
}
res.send({ message: "Employee deleted successfully!" });
})
.catch((err) => {
if (err.kind === "ObjectId" || err.name === "NotFound") {
return res.status(404).send({
message: "Employee not found with id " + req.params.employeeId,
});
}
return res.status(500).send({
message: "Could not delete employee with id " + req.params.employeeId,
});
});
};


