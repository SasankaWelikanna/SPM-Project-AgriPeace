// const mongoose = require("mongoose");

// const calculatorSchema = new mongoose.Schema({
//    crop: {
//     type: String,
//   },
//   landArea: {
//     type: Number,
//   },
//   soilType: {
//     type: String,
//   },
//   waterSource: {
//     type: String,
//   },
//   fertilizerType: {
//     type: String,
//   }
// });

// const Calculator = mongoose.model("Calculator", calculatorSchema);

// module.exports = Calculator;


const mongoose = require('mongoose');

const CostCalculatorSchema = new mongoose.Schema({
    crop: { type: String, required: true },
    area: { type: Number, required: true },
    waterResources: { type: String, required: true },
    soilType: { type: String, required: true },
    estimatedCost: { type: Number, required: true },
    fertilizerNeeds: { type: String, required: true },
    waterNeeds: { type: String, required: true },
}, { timestamps: true });

const CostCalculator = mongoose.model('CostCalculator', CostCalculatorSchema);

module.exports = CostCalculator;