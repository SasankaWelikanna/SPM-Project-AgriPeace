const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
