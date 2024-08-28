const Plant = require("../../models/FertilizerManagement/Fertilizer");

const addPlant = async (req, res) => {
  const { imageUrl, name, date, description } = req.body;
  try {
    const newPlant = await Plant.create({
      imageUrl,
      name,
      date,
      description,
    });
    res.json("New Plant Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find(); // Corrected to Plant.find()
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOnePlant = async (req, res) => {
  const id = req.params.id;
  try {
    const plant = await Plant.findById(id);
    res.status(200).json(plant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePlant = async (req, res) => {
  const id = req.params.id;
  try {
    await Plant.findByIdAndDelete(id);
    res.status(200).json({ message: "Plant Deleted" }); // Corrected message
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePlant = async (req, res) => {
  const id = req.params.id;
  const { imageUrl, name, date, description } = req.body;
  try {
    await Plant.findByIdAndUpdate(
      id,
      {
        imageUrl,
        name,
        date,
        description,
      },
      { new: true }
    ); // Added { new: true } to return updated document
    res.status(200).json({ message: "Plant Updated" }); // Corrected message
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
