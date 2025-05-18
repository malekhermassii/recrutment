module.exports = (app) => {
  const rewards = require("../controllers/reward.controller.js");

  app.post("/rewards", rewards.create);

  app.get("/rewards", rewards.findAll);

  app.get("/rewards/:rewardId", rewards.findOne);

  app.put("/rewards/:rewardId", rewards.update);

  app.delete("/rewards/:rewardId", rewards.delete);
};
