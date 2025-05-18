module.exports = (app) => {
    const applicants = require("../controllers/applicant.controller.js");
  
    app.post("/applicants", applicants.create);
  
    app.get("/applicants", applicants.findAll);
  
    app.get("/applicants/:applicantId", applicants.findOne);
  
    app.put("/applicants/:applicantId", applicants.update);
  
    app.delete("/applicants/:applicantId", applicants.delete);
  };
  