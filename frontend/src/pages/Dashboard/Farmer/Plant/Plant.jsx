import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";
import LargeModal from "../../../../components/Modal/LargeModal";
import SearchBar from "../../../../components/Search/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../../../components/Pagination/Pagination";

function Plant() {
  const axiosFetch = useAxiosFetch();
  const navigate = useNavigate();

  const [dataList, setDataList] = useState([]);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [plantsPerPage] = useState(8); // Adjust as needed

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axiosFetch.get("/Plant/");
      if (Array.isArray(response.data)) {
        setDataList(response.data);
        setFilteredDataList(response.data);
      } else {
        console.error("Unexpected data format:", response.data);
        toast.error("Unexpected data format from server.");
      }
    } catch (err) {
      console.error("Error fetching plants:", err);
      toast.error("Failed to fetch plants.");
    }
  };

  const handleSearch = (query) => {
    const filteredList = dataList.filter((plant) => {
      const fullName = `${plant.name} ${plant.description}`;
      return fullName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredDataList(filteredList);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    filterByCategory(event.target.value);
  };

  const filterByCategory = (category) => {
    if (category === "") {
      setFilteredDataList(dataList);
    } else {
      const filteredList = dataList.filter(
        (plant) => plant.category === category
      );
      setFilteredDataList(filteredList);
    }
  };

  const handleViewDetails = (plant) => {
    setSelectedPlant(plant);
    setAddModalOpen(true);
  };

  const handleModalClose = () => setAddModalOpen(false);

  const handleViewDiseases = (plantId) => {
    navigate(`/dashboard/plant/diseases/${plantId}`);
  };

  // Pagination calculations
  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = filteredDataList.slice(
    indexOfFirstPlant,
    indexOfLastPlant
  );
  const totalPages = Math.ceil(filteredDataList.length / plantsPerPage);

  return (
    <div className="mt-10 p-4 bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Plant Details
            </h2>
            <h6 className="text-sm text-gray-500">View plant details</h6>
          </div>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            {[...new Set(dataList.map((plant) => plant.category))].map(
              (category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
          <SearchBar onSearch={handleSearch} />
        </div>

        <LargeModal
          isOpen={addModalOpen}
          onClose={handleModalClose}
          title={selectedPlant ? selectedPlant.name : ""}
        >
          <div className="p-4">
            {selectedPlant && (
              <div>
                <img
                  src={selectedPlant.imageUrl}
                  alt="Plant"
                  className="w-full h-64 object-cover mb-4 rounded-lg"
                />
                <p>
                  <strong>Name:</strong> {selectedPlant.name}
                </p>
                <p>
                  <strong>Description:</strong> {selectedPlant.description}
                </p>
                <p>
                  <strong>Climate:</strong> {selectedPlant.climate}
                </p>
                <p>
                  <strong>Soil pH:</strong> {selectedPlant.soilPh}
                </p>
                <p>
                  <strong>Land Preparation:</strong>{" "}
                  {selectedPlant.landPreparation}
                </p>
                <p>
                  <strong>Fertilizers:</strong>{" "}
                  {selectedPlant.fertilizers.join(", ")}
                </p>
                <button
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
                  onClick={() => handleViewDiseases(selectedPlant._id)}
                >
                  View Diseases
                </button>
              </div>
            )}
          </div>
        </LargeModal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {currentPlants.length ? (
            currentPlants.map((plant) => (
              <div
                key={plant._id}
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer cursor-pointer hover:scale-105 hover:shadow-md"
                onClick={() => handleViewDetails(plant)}
              >
                <img
                  src={plant.imageUrl}
                  alt="Plant"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {plant.name}
                  </h3>
                  <p className="text-sm text-gray-500">{plant.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-4 text-gray-500 font-semibold">
              No plants found.
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>

      <ToastContainer />
    </div>
  );
}

export default Plant;
