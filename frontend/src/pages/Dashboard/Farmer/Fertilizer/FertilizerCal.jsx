import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { MdDelete, MdOutlineArrowBackIosNew } from "react-icons/md";

function FertilizerCalculator() {
  const navigate = useNavigate();

  const [plantType, setPlantType] = useState("");
  const [climate, setClimate] = useState("");
  const [area, setArea] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [fertilizerOptions, setFertilizerOptions] = useState([]);
  const [fertilizerQuantity, setFertilizerQuantity] = useState(null);

  const plantFertilizerMapping = {
    corn: ["Nitrogen", "Phosphorus", "Potassium", "Zinc"],
    wheat: ["Ammonium Nitrate", "Phosphate", "Potash", "Sulfur"],
    rice: ["Urea", "Superphosphate", "Muriate of Potash", "Zinc"],
    sorghum: ["Ammonium Nitrate", "Phosphate", "Potassium", "Boron"],
    barley: ["Ammonium Nitrate", "Phosphorus", "Potash", "Copper"],
    oats: ["Nitrogen", "Phosphate", "Potash", "Sulfur"],
    sugarcane: ["Urea", "Phosphorus", "Potassium", "Magnesium"],
    maize: ["Ammonium Nitrate", "Phosphate", "Potash", "Zinc"],
    potato: ["Nitrogen", "Phosphorus", "Potassium", "Calcium"],
    tomato: ["Nitrogen", "Phosphorus", "Potassium", "Magnesium"],
    carrot: ["Nitrogen", "Phosphorus", "Potassium", "Calcium"],
    onion: ["Urea", "Phosphorus", "Potash", "Sulfur"],
    spinach: ["Ammonium Nitrate", "Phosphate", "Potassium", "Magnesium"],
    cabbage: ["Urea", "Phosphorus", "Potassium", "Boron"],
    lettuce: ["Nitrogen", "Phosphorus", "Potassium", "Calcium"]
  };
  

  const plantTypes = [
    "corn", "wheat", "rice", "sorghum", "barley", "oats", "sugarcane", "maize",
    "potato", "tomato", "carrot", "onion", "spinach", "cabbage", "lettuce"
  ];

  const fertilizers = [
    "Nitrogen", "Phosphorus", "Potassium", "Ammonium Nitrate", "Phosphate",
    "Potash", "Urea", "Superphosphate", "Muriate of Potash"
  ];

  useEffect(() => {
    if (plantType) {
      setFertilizerOptions(plantFertilizerMapping[plantType] || []);
    }
  }, [plantType]);

  const handleCalculate = () => {
    if (!plantType || !climate || !area || !fertilizer) {
      toast.error("Please fill all fields.");
      return;
    }

    let baseQuantity = 100;
    const areaFactor = area * 0.5;

    if (plantType === "corn") {
      baseQuantity *= 1.2;
    } else if (plantType === "wheat") {
      baseQuantity *= 1.1;
    }

    if (climate === "tropical") {
      baseQuantity *= 1.3;
    } else if (climate === "temperate") {
      baseQuantity *= 1.1;
    }

    const fertilizerFactor = fertilizer === "Nitrogen" ? 1.2 : fertilizer === "Phosphorus" ? 1.1 : 1.0;

    const totalQuantity = (baseQuantity + areaFactor) * fertilizerFactor;
    setFertilizerQuantity(totalQuantity.toFixed(2));
    toast.success("Calculation Successful");
  };

  return (
    <div className="mt-10 p-4 bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700">
        <Link to="/dashboard/user-fertilizer">
            <MdOutlineArrowBackIosNew className="text-3xl mb-3" />
        </Link>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
          Fertilizer Calculator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plant Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Plant Type
            </label>
            <select
              value={plantType}
              onChange={(e) => setPlantType(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 p-2 rounded-md w-full dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Plant Type</option>
              {plantTypes.map((plant, index) => (
                <option key={index} value={plant}>
                  {plant.charAt(0).toUpperCase() + plant.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Fertilizer Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Fertilizer
            </label>
            <select
              value={fertilizer}
              onChange={(e) => setFertilizer(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 p-2 rounded-md w-full dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Fertilizer</option>
              {fertilizerOptions.map((fertilizer, index) => (
                <option key={index} value={fertilizer}>
                  {fertilizer}
                </option>
              ))}
            </select>
          </div>

          {/* Climate Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Climate
            </label>
            <select
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 p-2 rounded-md w-full dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Climate</option>
              <option value="tropical">Tropical</option>
              <option value="temperate">Temperate</option>
              <option value="arid">Arid</option>
            </select>
          </div>

          {/* Area Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Area (in acres)
            </label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 p-2 rounded-md w-full dark:bg-gray-700 dark:text-white"
              placeholder="Enter area in acres"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <div className="mt-6">
          <button
            onClick={handleCalculate}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Calculate Fertilizer Quantity
          </button>
        </div>

        {/* Result */}
        {fertilizerQuantity && (
          <div className="mt-6 text-gray-800 dark:text-white">
            <h4 className="font-medium">Recommended Fertilizer Quantity:</h4>
            <p>{fertilizerQuantity} kg</p>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default FertilizerCalculator;
