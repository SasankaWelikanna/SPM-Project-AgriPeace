import React, { useState, useEffect } from "react";
import useUser from "../../../../hooks/useUser";

const LocationForm = ({ handleSubmit, initialData }) => {
  const { currentUser } = useUser();
  const [formData, setFormData] = useState({
    province: "",
    district: "",
    city: "",
    latitude: "",
    longitude: "",
    areaSize: "",
    soilType: "",
    irrigationType: "",
  });

  useEffect(() => {
    // Ensure initialData is set for the current user only
    if (initialData && initialData.userId === currentUser._id) {
      setFormData(initialData);
    }
  }, [initialData, currentUser]);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const currentDate = getCurrentDate();
    setFormData((prevState) => ({
      ...prevState,
      date: currentDate,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && /[^\p{L}\s]/u.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const updatedFormData = { ...formData, userId: currentUser._id };
    handleSubmit(updatedFormData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="mb-4">
        <label htmlFor="province" className="block text-gray-700 font-semibold mb-1">
          Province
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="province"
          placeholder="Province"
          onChange={handleChange}
          value={formData.province}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="district" className="block text-gray-700 font-semibold mb-1">
          District
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="district"
          placeholder="District"
          onChange={handleChange}
          value={formData.district}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block text-gray-700 font-semibold mb-1">
          City
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="city"
          placeholder="City"
          onChange={handleChange}
          value={formData.city}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="latitude" className="block text-gray-700 font-semibold mb-1">
          Latitude
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="latitude"
          placeholder="Latitude"
          onChange={handleChange}
          value={formData.latitude}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="longitude" className="block text-gray-700 font-semibold mb-1">
          Longitude
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="longitude"
          placeholder="Longitude"
          onChange={handleChange}
          value={formData.longitude}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="areaSize" className="block text-gray-700 font-semibold mb-1">
          Area Size
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="areaSize"
          placeholder="Area Size (e.g., acres, hectares)"
          onChange={handleChange}
          value={formData.areaSize}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="soilType" className="block text-gray-700 font-semibold mb-1">
          Soil Type
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="soilType"
          placeholder="Soil Type"
          onChange={handleChange}
          value={formData.soilType}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="irrigationType" className="block text-gray-700 font-semibold mb-1">
          Irrigation Type
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          name="irrigationType"
          placeholder="Irrigation Type"
          onChange={handleChange}
          value={formData.irrigationType}
          required
        />
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

export default LocationForm;
