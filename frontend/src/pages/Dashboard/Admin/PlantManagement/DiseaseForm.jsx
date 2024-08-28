import React, { useState, useEffect } from "react";

function DiseaseForm({ handleSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    // Initialize form data with initialData props
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to ${value}`); // Debug log
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData); // Debug log
    handleSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-2">
          Disease Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows="4"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default DiseaseForm;
