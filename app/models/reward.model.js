const mongoose = require("mongoose");

const RewardSchema = mongoose.Schema(
{
reward: String,
rewardReason: String,
rewardedEmployee: String,
rewardDate: Date,
},
{
timestamps: true,
}
);
module.exports = mongoose.model("Reward", RewardSchema);
