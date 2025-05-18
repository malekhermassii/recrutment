module.exports = (app) => {
  const employees = require("../controllers/employee.controller.js");

  app.post("/employees", employees.create);

  app.get("/employees", employees.findAll);

  app.get("/employees/:employeeId", employees.findOne);

  app.put("/employees/:employeeId", employees.update);

  app.delete("/employees/:employeeId", employees.delete);
};
