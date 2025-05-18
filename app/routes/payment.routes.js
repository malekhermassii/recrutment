module.exports = (app) => {
  const payments = require("../controllers/payment.controller.js");

  app.post("/payments", payments.create);

  app.get("/payments", payments.findAll);

  app.get("/payments/:paymentId", payments.findOne);

  app.put("/payments/:paymentId", payments.update);

  app.delete("/payments/:paymentId", payments.delete);
};
