const mongoose = require("mongoose");

const alienSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tech: {
    type: String,
    required: true,
  },
  sub: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Alien", alienSchema);
