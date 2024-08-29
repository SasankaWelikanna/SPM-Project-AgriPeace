const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  climate: {
    type: String,
    required: true,
  },
  soilPh: {
    type: String,
    required: true,
  },
  landPreparation: {
    type: String,
    required: true,
  },
  fertilizers: [
    {
      type: String,
    },
  ],
  diseases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disease",
    },
  ],
});

module.exports = mongoose.model("Plant", PlantSchema);
