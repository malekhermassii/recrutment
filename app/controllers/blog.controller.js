const Blog = require("../models/blog.model.js");
const path = require('path');

// Create and Save a new blog
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Blog title can not be empty",
    });
  }

  // Create a blog
  const blog = new Blog({
    title: req.body.title || "Untitled Blog",
    body: req.body.body,
    author: req.body.author,
    tags: req.body.tags,
    image: req.file ? req.file.filename : null, // Use the uploaded filename if a file was uploaded
  });

  // Save blog in the database
  blog
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the blog.",
      });
    });
};

// Retrieve and return all blogs from the database.
exports.findAll = (req, res) => {
  Blog.find()
    .then((blogs) => {
      res.send(blogs);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blogs.",
      });
    });
};

// Find a single blog with a blogId
exports.findOne = (req, res) => {
  Blog.findById(req.params.blogId)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: "Blog not found with id " + req.params.blogId,
        });
      }
      res.send(blog);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Blog not found with id " + req.params.blogId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving blog with id " + req.params.blogId,
      });
    });
};

// Update a blog identified by the blogId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Blog title can not be empty",
    });
  }

  // Find blog and update it with the request body
  Blog.findByIdAndUpdate(
    req.params.blogId,
    {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      tags: req.body.tags,
      image: req.file ? req.file.filename : null,
    },
    { new: true }
  )
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: "Blog not found with id " + req.params.blogId,
        });
      }
      res.send(blog);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Blog not found with id " + req.params.blogId,
        });
      }
      return res.status(500).send({
        message: "Error updating blog with id " + req.params.blogId,
      });
    });
};
// Delete a blog with the specified blogId in the request
exports.delete = (req, res) => {
  Blog.findByIdAndRemove(req.params.blogId)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: "Blog not found with id " + req.params.blogId,
        });
      }
      res.send({ message: "Blog deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Blog not found with id " + req.params.blogId,
        });
      }
      return res.status(500).send({
        message: "Could not delete blog with id " + req.params.blogId,
      });
    });
};


/*
title: req.body.title,
body: req.body.body,
author: req.body.author,
tags: req.body.tags,
image: req.body.image,
*/