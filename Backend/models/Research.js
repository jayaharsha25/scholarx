const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  abstract: {
    type: String,
    required: true,
  },

  file: {
    type: String,
    required: true,
  },

  // 🔥 IMPORTANT (connects user to research)
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Research", researchSchema);