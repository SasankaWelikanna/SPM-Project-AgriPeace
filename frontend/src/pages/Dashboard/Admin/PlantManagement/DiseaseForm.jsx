import React, { useState, useEffect } from "react";
import storage from "../../../../config/firebase.init";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function DiseaseForm({ handleSubmit, initialData = {} }) {
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    causalAgent: "",
    diseaseTransmission: "",
    diseaseSymptoms: "",
    control: "",
    fertilizers: "",
    plantId: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    img && uploadFile(img, "imageUrl");
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
      setFormData(initialData);
    }
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
              onChange={(e) => setImg(e.target.files[0])}
            />
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
            <textarea
              id="fertilizers"
              name="fertilizers"
              value={formData.fertilizers}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="3"
              required
            />
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
