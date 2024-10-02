import React, { useState, useEffect } from "react";
import Scroll from "../../hooks/useScroll";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Import your Axios hook

const Products = () => {
  const [plantsData, setPlantsData] = useState([]);
  const [fertilizersData, setFertilizersData] = useState([]); // State for fertilizers
  const [selectedSection, setSelectedSection] = useState("plants");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axiosSecure.get("/Plant"); // Adjust the endpoint as necessary
        // Sort plants alphabetically by name
        const sortedPlants = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setPlantsData(sortedPlants);
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    };

    const fetchFertilizers = async () => {
      try {
        const response = await axiosSecure.get("/Fertilizer"); // Adjust the endpoint for fertilizers
        // Sort fertilizers alphabetically by productName
        const sortedFertilizers = response.data.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
        setFertilizersData(sortedFertilizers);
      } catch (error) {
        console.error("Error fetching fertilizer data:", error);
      }
    };

    fetchPlants();
    fetchFertilizers();
  }, [axiosSecure]);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 mt-10">
      <Scroll />

      {/* Section Toggle Buttons */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${
            selectedSection === "plants"
              ? "bg-green-600 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => handleSectionChange("plants")}
        >
          Plants
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedSection === "fertilizers"
              ? "bg-green-600 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => handleSectionChange("fertilizers")}
        >
          Fertilizers
        </button>
      </div>

      {/* Conditional Rendering for Plants and Fertilizers */}
      {selectedSection === "plants" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 shadow-lg ">
          {plantsData.map((plant) => (
            <div
              key={plant.id} // Assuming each plant has a unique 'id'
              className="relative p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-950 dark:border-gray-800 hover:scale-105 duration-500"
            >
              <img
                src={plant.imageUrl} // Ensure your plant object contains this field
                alt={plant.name}
                className="w-full h-48 object-cover rounded-lg "
              />
              <h3 className="mt-2 font-semibold text-center dark:text-white ">
                {plant.name}
              </h3>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-center">{plant.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fertilizersData.map((fertilizer) => (
            <div
              key={fertilizer.id} // Assuming each fertilizer has a unique 'id'
              className="relative p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="mt-2 font-semibold text-center dark:text-white">
                {fertilizer.productName}
              </h3>
              <div className="relative">
                {/* Optional: Add image for fertilizers if available */}
                {fertilizer.imageUrl && (
                  <img
                    src={fertilizer.imageUrl}
                    alt={fertilizer.productName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center">
                    {fertilizer.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
