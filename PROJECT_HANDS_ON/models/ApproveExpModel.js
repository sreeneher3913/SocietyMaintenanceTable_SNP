const mongoose = require("mongoose");

const ApproveExpSchema = new mongoose.Schema({
  Month: {
    type: String,
  },
  PaidTo: {
    type: String,
  },
  Amount: {
    type: Number,
  },
  Due: {
    type: Number,
  },
  Name: {
    type: String,
  },
});

module.exports = mongoose.model("ApprExp", ApproveExpSchema);
