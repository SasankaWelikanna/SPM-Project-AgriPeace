const router = require("express").Router();
const PlantCtrl = require("../../controllers/PlantManagement/PlantCtrl");

router.post("/add", PlantCtrl.addPlant);
router.get("/", PlantCtrl.getAllPlants);
router.get("/get/:id", PlantCtrl.getOnePlant);
router.delete("/delete/:id", PlantCtrl.deletePlant);
router.put("/update/:id", PlantCtrl.updatePlant);

module.exports = router;
