const Plant = require("../../models/PlantManagement/plant");

// Add a new plant
const addPlant = async (req, res) => {
  const {
    imageUrl,
    name,
    category,
    description,
    climate,
    soilPh,
    landPreparation,
    fertilizers,
  } = req.body;

  try {
    // Check if plant with the same name already exists
    const existingPlant = await Plant.findOne({ name });
    if (existingPlant) {
      return res.status(400).json({ message: "Plant already exists" });
    }

    // If plant doesn't exist, create a new plant
    const newPlant = await Plant.create({
      imageUrl,
      name,
      category,
      description,
      climate,
      soilPh,
      landPreparation,
      fertilizers,
    });
    res.status(201).json("New Plant Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all plants
const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find().sort({ name: 1 });
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single plant by ID
const getOnePlant = async (req, res) => {
  const id = req.params.id;
  try {
    const plant = await Plant.findById(id);
    res.status(200).json(plant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a plant
const deletePlant = async (req, res) => {
  const id = req.params.id;
  try {
    await Plant.findByIdAndDelete(id);
    res.status(200).json({ message: "Plant Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Plant
const updatePlant = async (req, res) => {
  const id = req.params.id;
  const {
    imageUrl,
    name,
    category,
    description,
    climate,
    soilPh,
    landPreparation,
    fertilizers,
  } = req.body;
  try {
    await Plant.findByIdAndUpdate(
      id,
      {
        imageUrl,
        name,
        category,
        description,
        climate,
        soilPh,
        landPreparation,
        fertilizers,
      },
      { new: true }
    );
    res.status(200).json({ message: "Plant Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addPlant,
  getAllPlants,
  getOnePlant,
  deletePlant,
  updatePlant,
};
