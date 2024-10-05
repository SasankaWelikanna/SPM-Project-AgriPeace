import React, { useState, useEffect } from "react";

const CropForm = ({ handleSubmit, initialData, totalLandSize, usedLandSize, plantOptions }) => {
  const [formData, setFormData] = useState({
    cropName: "",
    cropType: "",
    landSize: "",
    plantingQuantity: "",
    expectedQuantity: "",
    plantingDate: "",
    expectedDate: "",
    ...initialData,
  });

  const [warningMessage, setWarningMessage] = useState("");
  const [dateWarning, setDateWarning] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const remainingArea = totalLandSize - usedLandSize;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "landSize") {
      const numericValue = parseFloat(value);
      if (numericValue > remainingArea) {
        setWarningMessage(`You have exceeded the remaining area of ${remainingArea.toFixed(2)} units.`);
        return;
      } else {
        setWarningMessage(""); // Clear warning if valid
      }
    }

    // Validate planting and expected dates
    if (name === "plantingDate" || name === "expectedDate") {
      const plantingDate = new Date(formData.plantingDate);
      const expectedDate = new Date(name === "expectedDate" ? value : formData.expectedDate);
      
      if (name === "plantingDate" && expectedDate && new Date(value) > expectedDate) {
        setDateWarning("Planting date cannot be after the expected date.");
      } else if (name === "expectedDate" && plantingDate && new Date(value) < plantingDate) {
        setDateWarning("Expected date cannot be before the planting date.");
      } else {
        setDateWarning(""); // Clear date warning if valid
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    //Check remaining area size
    if (parseFloat(formData.landSize) > remainingArea) {
      setWarningMessage(`The entered land size exceeds the remaining area of ${remainingArea.toFixed(2)} units.`);
      return;
    }

    // Check date validation
    if (new Date(formData.plantingDate) > new Date(formData.expectedDate)) {
      setDateWarning("Planting date cannot be after the expected date.");
      return;
    }

    handleSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="mb-4">
        <label htmlFor="cropName" className="block text-gray-700 font-semibold mb-1">
          Crop Name
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          name="cropName"
          onChange={handleChange}
          value={formData.cropName}
          required
        >
          <option value="">Select a crop</option>
          {plantOptions.map((plant) => (
            <option key={plant._id} value={plant.name}>
              {plant.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="cropType" className="block text-gray-700 font-semibold mb-1">
          Crop Type
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="cropType"
          placeholder="Crop Type"
          onChange={handleChange}
          value={formData.cropType}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="landSize" className="block text-gray-700 font-semibold mb-1">
          Land Size
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="landSize"
          placeholder="Land Size (e.g., acres, hectares)"
          onChange={handleChange}
          value={formData.landSize}
          required
        />
        <p className="text-sm text-gray-500">
          Remaining area: {remainingArea.toFixed(2)} units
        </p>
        {warningMessage && <p className="text-red-500 text-sm">{warningMessage}</p>}
      
      </div>

      <div className="mb-4">
        <label htmlFor="plantingQuantity" className="block text-gray-700 font-semibold mb-1">
          Planting Quantity
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="plantingQuantity"
          placeholder="Planting Quantity"
          onChange={handleChange}
          value={formData.plantingQuantity}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="expectedQuantity" className="block text-gray-700 font-semibold mb-1">
          Expected Quantity
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="expectedQuantity"
          placeholder="Expected Quantity"
          onChange={handleChange}
          value={formData.expectedQuantity}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="plantingDate" className="block text-gray-700 font-semibold mb-1">
          Planting Date
        </label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="plantingDate"
          onChange={handleChange}
          value={formData.plantingDate}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="expectedDate" className="block text-gray-700 font-semibold mb-1">
          Expected Date
        </label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="expectedDate"
          onChange={handleChange}
          value={formData.expectedDate}
          required
        />
        {dateWarning && <p className="text-red-500 text-sm">{dateWarning}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default CropForm;
