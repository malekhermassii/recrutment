const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema(
{
employee: String,
salary: Number,
paymentDate: Date,
},
{
timestamps: true,
}
);

module.exports = mongoose.model("Payment", PaymentSchema);
