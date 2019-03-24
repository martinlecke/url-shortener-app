const mongoose = require("mongoose");

const urlShortSchema = new mongoose.Schema({
  shorten: {
    type: String,
    required: true
  },
  customUrl: String,
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  visited: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("UrlShort", urlShortSchema);
