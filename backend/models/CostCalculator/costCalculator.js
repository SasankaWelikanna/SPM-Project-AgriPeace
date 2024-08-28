// const mongoose = require('mongoose');

// const CostCalculatorSchema = new mongoose.Schema({
//     crop: { type: String, required: true },
//     area: { type: Number, required: true },
//     waterResources: { type: String, required: true },
//     soilType: { type: String, required: true },
//     estimatedCost: { type: Number, required: true },
//     fertilizerNeeds: { type: String, required: true },
//     waterNeeds: { type: String, required: true },
// }, { timestamps: true });

// const CostCalculator = mongoose.model('CostCalculator', CostCalculatorSchema);

// module.exports = CostCalculator;

// models/CostCalculation.js
const mongoose = require('mongoose');

const CostCalculationSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  crop: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  waterResources: {
    type: String,
    required: true,
  },
  soilType: {
    type: String,
    required: true,
  },
  estimatedCost: {
    type: Number,
    required: true,
  },
  fertilizerNeeds: {
    type: String,
    required: true,
  },
  waterNeeds: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CostCalculation', CostCalculationSchema);
