module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  app.post("/users", users.create);
  app.get("/users", users.findAll);
  app.get("/users/:userId", users.findOne);
  app.put("/users/:userId", users.update);
  app.delete("/users/:userId", users.delete);

  // Use app instead of router for login and logout routes
  app.post("/login", users.login);
  app.get("/logout", users.logout);
};
