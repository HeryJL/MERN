const mongoose = require("mongoose");

const Film = new mongoose.Schema({
  titre: { type: String, required: true },
  description: String,
  category: String,
  image : String,
  filename: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Film", Film);
