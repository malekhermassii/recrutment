const mongoose = require('mongoose');
const postSchema= mongoose.Schema({
    title:String,
    locationAddress:String,
    missions:String,
    postType:String,
    salary:String,
    skills:String,
    workRequirements:String,
    workTime:String,
    image:String
});

module.exports= mongoose.model("Jobs",postSchema);
