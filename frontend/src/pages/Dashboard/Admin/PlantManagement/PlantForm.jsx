import React, { useState, useEffect } from "react";
import storage from "../../../../config/firebase.init";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { MdClose } from "react-icons/md";

const PlantForm = ({ handleSubmit, initialData }) => {
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    category: "",
    description: "",
    climate: "",
    soilPh: "",
    landPreparation: "",
    fertilizers: [],
  });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  // Handles image upload
  useEffect(() => {
    if (img) {
      uploadFile(img, "imageUrl");
    }
  }, [img]);

  // Upload image to Firebase and set the download URL
  const uploadFile = (file, fileType) => {
    const fileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, "images/plants/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
      },
      (error) => {
        console.error(error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, [fileType]: downloadURL }));
          setUploading(false);
        });
      }
    );
  };

  // Populate the form with initial data if provided
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        fertilizers: initialData.fertilizers || [], // Ensure fertilizers is an array
      }));
    }
  }, [initialData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle dynamic fertilizers input
  const handleFertilizersChange = (e, index) => {
    const newFertilizers = [...formData.fertilizers];
    newFertilizers[index] = e.target.value;
    setFormData((prev) => ({ ...prev, fertilizers: newFertilizers }));
  };

  const handleAddFertilizer = () => {
    setFormData((prev) => ({
      ...prev,
      fertilizers: [...prev.fertilizers, ""],
    }));
  };

  const handleRemoveFertilizer = (index) => {
    setFormData((prev) => ({
      ...prev,
      fertilizers: prev.fertilizers.filter((_, i) => i !== index),
    }));
  };

  // Validates the form before submission
  const validateForm = () => {
    const newErrors = {};

    // Name validation

    if (!formData.name || formData.name.length < 3) {
      newErrors.name =
        "Plant name is required and must be at least 3 characters.";
    }

    const namePattern = /^[A-Za-z]+$/;

    if (!namePattern.test(formData.name)) {
      newErrors.name = "Only contain letters.";
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Category is required.";
    }

    // Description validation
    if (!formData.description || formData.description.length < 10) {
      newErrors.description =
        "Description is required and must be at least 10 characters.";
    }

    // Climate validation
    if (!formData.climate) {
      newErrors.climate = "Climate is required.";
    }

    // Soil pH validation (must be a number)
    const soilPhPattern = /^(?:[0-9]*(?:\.[0-9]+)?)(?:-[0-9]*(?:\.[0-9]+)?)?$/;
    if (!formData.soilPh || !soilPhPattern.test(formData.soilPh)) {
      newErrors.soilPh = "Soil pH must be a valid number without spaces";
    }

    // Land Preparation validation
    if (!formData.landPreparation) {
      newErrors.landPreparation = "Land preparation is required.";
    }

    // Fertilizers validation (all fertilizers must be non-empty strings)
    if (formData.fertilizers.some((fertilizer) => fertilizer.trim() === "")) {
      newErrors.fertilizers = "All fertilizers fields must be filled out.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form data
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {/* Image Upload Section */}
          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-gray-700 font-semibold mb-1 dark:text-white"
            >
              {uploading ? `Uploading: ${imgPerc}%` : "Image"}
            </label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
              name="imageUrl"
              onChange={(e) => setImg(e.target.files[0])}
            />
            {formData.imageUrl && !uploading && (
              <div className="mt-4">
                <img
                  src={formData.imageUrl}
                  alt="Uploaded Preview"
                  className="w-40 h-40 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white"
                />
              </div>
            )}
          </div>

          {/* Plant Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1 dark:text-white"
            >
              Plant Name
            </label>
            <input
              type="text"
              className={`w-full p-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md dark:bg-gray-800 dark:text-white`}
              name="name"
              placeholder="Plant Name"
              onChange={handleChange}
              value={formData.name}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-semibold mb-1 dark:text-white"
            >
              Category
            </label>
            <select
              name="category"
              className={`w-full p-2 border ${
                errors.category ? "border-red-500" : "border-gray-300"
              } rounded-md dark:bg-gray-800 dark:text-white`}
              onChange={handleChange}
              value={formData.category}
              required
            >
              <option value="">Select Category</option>
              <option value="Rice">Rice</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Leafy">Leafy Vegetable</option>
              <option value="Fruits">Fruits</option>
              <option value="Root Crops">Root Crops</option>
              <option value="Condiments">Condiments</option>
              <option value="Mushrooms">Mushrooms</option>
              <option value="Coarse Grains">Coarse Grains</option>
              <option value="Legumes">Legumes</option>
              <option value="Oil Crops">Oil Crops</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-1 dark:text-white"
            >
              Description
            </label>
            <textarea
              className={`w-full p-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md dark:bg-gray-800 dark:text-white`}
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={formData.description}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Climate */}
          <div className="mb-4">
            <label
              htmlFor="climate"
              className="block text-gray-700 font-semibold mb-1 dark:text-white"
            >
              Climate
            </label>
            <input
              type="text"
              className={`w-full p-2 border ${
                errors.climate ? "border-red-500" : "border-gray-300"
              } rounded-md dark:bg-gray-800 dark:text-white`}
              name="climate"
              placeholder="Climate"
              onChange={handleChange}
              value={formData.climate}
              required
            />
            {errors.climate && (
              <p className="text-red-500 text-sm">{errors.climate}</p>
            )}
          </div>
        </div>

        <div>
          {/* Soil pH */}
          <div className="mb-4">
            <label
              htmlFor="soilPh"
              className="block text-gray-700 font-semibold mb-1 dark:text-white"
            >
              Soil pH
            </label>
            <input
              type="text"
              className={`w-full p-2 border ${
                errors.soilPh ? "border-red-500" : "border-gray-300"
              } rounded-md dark:bg-gray-800 dark:text-white`}
              name="soilPh"
              placeholder="Soil pH (e.g., 6.5 or 6.5-7.5)"
              onChange={handleChange}
              value={formData.soilPh}
              required
            />
            {errors.soilPh && (
              <p className="text-red-500 text-sm">{errors.soilPh}</p>
            )}
          </div>

          {/* Land Preparation */}
          <div className="mb-4">
            <label
              htmlFor="landPreparation"
              className="block text-gray-700 font-semibold mb-1 dark:text-white"
            >
              Land Preparation
            </label>
            <input
              type="text"
              className={`w-full p-2 border ${
                errors.landPreparation ? "border-red-500" : "border-gray-300"
              } rounded-md dark:bg-gray-800 dark:text-white`}
              name="landPreparation"
              placeholder="Land Preparation"
              onChange={handleChange}
              value={formData.landPreparation}
              required
            />
            {errors.landPreparation && (
              <p className="text-red-500 text-sm">{errors.landPreparation}</p>
            )}
          </div>

          {/* Fertilizers */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1 dark:text-white">
              Fertilizers
            </label>
            {formData.fertilizers.map((fertilizer, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  className={`w-full p-2 border ${
                    errors.fertilizers ? "border-red-500" : "border-gray-300"
                  } rounded-md dark:bg-gray-800 dark:text-white`}
                  placeholder={`Fertilizer ${index + 1}`}
                  value={fertilizer}
                  onChange={(e) => handleFertilizersChange(e, index)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFertilizer(index)}
                  className="ml-2 py-1 text-red-500"
                >
                  <div className="border border-gray-300 rounded-md p-2 hover:bg-red-600 hover:text-white hover:scale-110">
                    <MdClose size={20} />
                  </div>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFertilizer}
              className="mt-2 px-4 py-2 border border-secondary  text-secondary rounded hover:text-white  hover:bg-secondary"
            >
              Add Fertilizer
            </button>
            {errors.fertilizers && (
              <p className="text-red-500 text-sm">{errors.fertilizers}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-secondary text-white rounded-md hover:bg-green-700"
      >
        {initialData ? "Update Plant" : "Add Plant"}
      </button>
    </form>
  );
};

export default PlantForm;
