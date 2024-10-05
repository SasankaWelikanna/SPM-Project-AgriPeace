import React, { useState, useEffect } from "react";
import Scroll from "../../hooks/useScroll";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Import your Axios hook

const Products = () => {
  const [plantsData, setPlantsData] = useState([]);
  const [fertilizersData, setFertilizersData] = useState([]);
  const [selectedSection, setSelectedSection] = useState("plants");
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [selectedCategory, setSelectedCategory] = useState("All"); // State for category filter
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axiosSecure.get("/Plant");
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
        const response = await axiosSecure.get("/Fertilizer");
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
    setSearchQuery(""); // Reset search query when switching sections
    setSelectedCategory("All"); // Reset category filter when switching sections
  };

  // Get unique categories for plants and fertilizers
  const plantCategories = [
    "All",
    ...new Set(plantsData.map((plant) => plant.category)),
  ];
  const fertilizerCategories = [
    "All",
    ...new Set(fertilizersData.map((fertilizer) => fertilizer.category)),
  ];

  // Filter plants or fertilizers based on the search query and selected category
  const filteredPlants = plantsData.filter((plant) => {
    return (
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || plant.category === selectedCategory)
    );
  });

  const filteredFertilizers = fertilizersData.filter((fertilizer) => {
    return (
      fertilizer.productName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || fertilizer.category === selectedCategory)
    );
  });

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 mt-10">
      <Scroll />

      {/* Section Toggle Buttons */}
      <div className="flex justify-center mb-6">
        <div className="bg-white py-2 px-4 dark:bg-slate-900 relative">
          <div className="flex space-x-4">
            <button
              className={`relative px-20 py-2 mr-2 rounded ${
                selectedSection === "plants"
                  ? "text-black dark:text-white text-2xl font-bold"
                  : "text-gray-600 text-2xl font-bold dark:text-white hover:scale-105 duration-300"
              }`}
              onClick={() => handleSectionChange("plants")}
            >
              Plants
              {selectedSection === "plants" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary rounded transition-all duration-300"></div>
              )}
            </button>
            <button
              className={`relative px-20 py-2 rounded ${
                selectedSection === "fertilizers"
                  ? "text-black dark:text-white text-2xl font-bold"
                  : "text-gray-600 text-2xl font-bold dark:text-white hover:scale-105 duration-300"
              }`}
              onClick={() => handleSectionChange("fertilizers")}
            >
              Fertilizers
              {selectedSection === "fertilizers" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary rounded transition-all duration-300"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar and Category Filter */}
      <div className="mb-6 flex justify-between">
        <input
          type="text"
          placeholder={`Search ${
            selectedSection === "plants" ? "Plants" : "Fertilizers"
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />

        {/* Sort by Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="ml-4 p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          {selectedSection === "plants"
            ? plantCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
            : fertilizerCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
        </select>
      </div>

      {/* Conditional Rendering for Plants and Fertilizers */}
      {selectedSection === "plants" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 shadow-lg">
          {filteredPlants.map((plant) => (
            <div
              key={plant.id}
              className="relative p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-950 dark:border-gray-800 hover:scale-105 duration-500"
              data-aos="fade-in"
              data-aos-duration="2000"
            >
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="mt-2 font-semibold text-center dark:text-white">
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
          {filteredFertilizers.map((fertilizer) => (
            <div
              key={fertilizer.id}
              className="relative p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3
                className="mt-2 font-semibold text-center dark:text-white"
                data-aos="fade-in"
                data-aos-duration="2000"
              >
                {fertilizer.productName}
              </h3>
              <div className="relative">
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
