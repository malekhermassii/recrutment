const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "Email and password are required.",
    });
  }

  // Check if the email is already registered
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        // Create a new user with hashed password
        const newUser = new User({
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: hash,
          phone: req.body.phone,
        });

        // Save the user to the database
        newUser
          .save()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user.",
            });
          });
      });
    });
  });
};

// Handle user login
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
// Compare the entered password with the stored hashed password
bcrypt.compare(password, user.password, (err, isMatch) => {
  if (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (isMatch) {
    // Authentication successful
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' }); // Generate a token

    return res.status(200).json({ message: "Authentication successful", token: token }); // Include the token in the response
  } else {
    return res.status(401).json({ message: "Authentication failed" });
  }
});
  });
};

// Handle user logout
exports.logout = (req, res) => {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
  return res.status(200).json({ message: "Logout successful" });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId,
      });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.email) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }

  // Find user and update it with the request body
  User.findByIdAndUpdate(
    req.params.userId,
    {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email || "Untitled User",
      password: req.body.password,
      phone: req.body.phone,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId,
      });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId,
      });
    });
};
