const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
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

const Plant = mongoose.model("Plant", PlantSchema);

module.exports = Plant;
