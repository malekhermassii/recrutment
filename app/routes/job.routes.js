module.exports = (app) => {
  const job = require("../controllers/job.controller.js");

  app.post("/jobs", job.create);

  app.get("/jobs", job.findAll);

  app.get("/jobs/:jobId", job.findOne);

  app.put("/jobs/:jobId", job.update);

  app.delete("/jobs/:jobId", job.delete);
};
