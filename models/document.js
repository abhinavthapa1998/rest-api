const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    // ref: "Users",
  },
});

module.exports = mongoose.model("Document", documentSchema);
