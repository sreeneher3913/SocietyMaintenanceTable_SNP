const mongoose = require("mongoose");

const credSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
  Phone: {
    type: String,
  },
});

module.exports = mongoose.model("Cred", credSchema);
