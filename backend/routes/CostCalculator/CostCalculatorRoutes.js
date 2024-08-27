// router = require("express").Router();
// const CostCalculatorController = require("../../controllers/CostCalculator/CostCalculatorController");

// router.post("/api/calculate", CostCalculatorController.calculateCost);

// module.exports = router;

const express = require('express');
const { calculateCost, getEstimates } = require("../../controllers/CostCalculator/CostCalculatorController");

const router = express.Router();

router.post('/calculate', calculateCost);

module.exports = router;