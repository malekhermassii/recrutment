module.exports = (app) => {
    const interviews = require("../controllers/interview.controller.js");
  
    app.post("/interviews", interviews.create);
  
    app.get("/interviews", interviews.findAll);
  
    app.get("/interviews/:interviewId", interviews.findOne);
  
    app.put("/interviews/:interviewId", interviews.update);
  
    app.delete("/interviews/:interviewId", interviews.delete);
  };