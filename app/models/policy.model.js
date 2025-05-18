const mongoose = require("mongoose");

const PolicySchema = mongoose.Schema(
{
policyTitle: String,
policyDescription: String,
},
{
timestamps: true,
}
);
module.exports = mongoose.model("Policy", PolicySchema);
