const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: false, // Assuming imageUrl is not required
    },
    name: {
      type: String,
      required: true,
    },
    causalAgent: {
      type: String,
      required: true,
    },
    diseaseTransmission: {
      type: String,
      required: true,
    },
    diseaseSymptoms: {
      type: String,
      required: true,
    },
    control: {
      type: String,
      required: true,
    },
    fertilizers: {
      type: [String], // Changed to an array of strings
      required: true,
    },
    plantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Disease = mongoose.model("Disease", diseaseSchema);

module.exports = Disease;
