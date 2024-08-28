const express = require("express");
const router = express.Router();
const {
  createDisease,
  getDiseasesByPlantId,
  getDiseaseById,
  updateDisease,
  deleteDisease,
} = require("../../controllers/PlantManagement/diseaseController");

// Create a new disease
router.post("/", createDisease);

// Get all diseases for a specific plant
router.get("/plant/:plantId", getDiseasesByPlantId);

// Get a specific disease by ID
router.get("/:id", getDiseaseById);

// Update a disease
router.put("/:id", updateDisease);

// Delete a disease
router.delete("/:id", deleteDisease);

module.exports = router;
