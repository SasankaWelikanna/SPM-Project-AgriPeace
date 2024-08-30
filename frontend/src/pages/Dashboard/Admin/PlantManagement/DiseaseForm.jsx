import React, { useState, useEffect } from "react";
import storage from "../../../../config/firebase.init";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function DiseaseForm({ handleSubmit, initialData = {} }) {
  const [img, setImg] = useState(undefined);
  const [imgPreview, setImgPreview] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    causalAgent: "",
    diseaseTransmission: "",
    diseaseSymptoms: "",
    control: "",
    fertilizers: [], // Ensure this is always an array
    plantId: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (img) {
      uploadFile(img, "imageUrl");
    }
  }, [img]);

  const uploadFile = (file, fileType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "images/diseases/" + fileName);
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
        console.log(error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({
            ...prev,
            [fileType]: downloadURL,
          }));
          setUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        fertilizers: initialData.fertilizers || [], // Ensure fertilizers is an array
      }));
      if (initialData.imageUrl) {
        setImgPreview(initialData.imageUrl);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFertilizerChange = (index, value) => {
    const newFertilizers = [...formData.fertilizers];
    newFertilizers[index] = value;
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
    handleSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex flex-wrap">
        {/* Left Section */}
        <div className="w-full md:w-1/2 pr-2">
          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-gray-700 font-semibold mb-1"
            >
              {uploading ? `Uploading: ${imgPerc}%` : "Image"}
            </label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded-md"
              name="imageUrl"
              onChange={(e) => {
                const file = e.target.files[0];
                setImg(file);
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setImgPreview(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
            {imgPreview && (
              <img
                src={imgPreview}
                alt="Image preview"
                className="mt-2 max-w-full h-auto"
              />
            )}
          </div>
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
            <label htmlFor="causalAgent" className="block text-gray-700 mb-2">
              Causal Agent
            </label>
            <input
              id="causalAgent"
              name="causalAgent"
              type="text"
              value={formData.causalAgent}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="diseaseTransmission"
              className="block text-gray-700 mb-2"
            >
              Disease Transmission
            </label>
            <input
              id="diseaseTransmission"
              name="diseaseTransmission"
              type="text"
              value={formData.diseaseTransmission}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="diseaseSymptoms"
              className="block text-gray-700 mb-2"
            >
              Disease Symptoms
            </label>
            <textarea
              id="diseaseSymptoms"
              name="diseaseSymptoms"
              value={formData.diseaseSymptoms}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="3"
              required
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 pl-2">
          <div className="mb-4">
            <label htmlFor="control" className="block text-gray-700 mb-2">
              Control
            </label>
            <textarea
              id="control"
              name="control"
              value={formData.control}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="3"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fertilizers" className="block text-gray-700 mb-2">
              Fertilizers
            </label>
            {formData.fertilizers.map((fertilizer, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={fertilizer}
                  onChange={(e) =>
                    handleFertilizerChange(index, e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFertilizer(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFertilizer}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Fertilizer
            </button>
          </div>
        </div>
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
