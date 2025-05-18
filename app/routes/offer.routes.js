module.exports = (app) => {
    const offers = require("../controllers/offer.controller.js");
  
    app.post("/offers", offers.create);
  
    app.get("/offers", offers.findAll);
  
    app.get("/offers/:offerId", offers.findOne);
  
    app.put("/offers/:offerId", offers.update);
  
    app.delete("/offers/:offerId", offers.delete);
  };
  