module.exports = (app) => {
  const policies = require("../controllers/policy.controller.js");

  app.post("/policies", policies.create);

  app.get("/policies", policies.findAll);

  app.get("/policies/:policyId", policies.findOne);

  app.put("/policies/:policyId", policies.update);

  app.delete("/policies/:policyId", policies.delete);
};
