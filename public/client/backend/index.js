const express = require('express');
const cors = require('cors');
require("./config");
const Post = require('./post');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/search/:title/:locationAddress", async (req, resp) => {
    const title = req.params.title;
    let locationAddress = req.params.locationAddress;
  
    if (!title) {
      resp.send([]);
      return;
    }
  
    const query = {};
  
    if (title) {
      query.title = { $regex: title };
    }
  
    if (locationAddress === "all") {
      locationAddress = ""; // Set the locationAddress to an empty string to include all categories
    }
  
    if (locationAddress) {
      query.locationAddress = { $regex: locationAddress };
    }
  
    try {
      const data = await Post.find(query);
      resp.send(data);
    } catch (error) {
      resp.status(500).send({ error: "An error occurred while searching." });
    }
  });
  

app.listen(5000);
