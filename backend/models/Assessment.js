const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  choices: [
    {
      type: String,
      required: true,
    },
  ],
  justification: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Assessment", assessmentSchema);
