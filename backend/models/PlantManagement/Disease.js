const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
