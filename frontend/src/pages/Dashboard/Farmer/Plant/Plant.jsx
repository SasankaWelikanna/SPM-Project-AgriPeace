import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { useNavigate, useLocation } from "react-router-dom";
import LargeModal from "../../../../components/Modal/LargeModal";
import SearchBar from "../../../../components/Search/SearchBar";
import { toast } from "react-toastify";
import Pagination from "../../../../components/Pagination/Pagination";
import useDebounce from "../../../../hooks/useDebounce";
import Card from "../../../../components/Card/Card";

function Plant() {
  const axiosFetch = useAxiosFetch();
  const navigate = useNavigate();
  const location = useLocation();

  const [dataList, setDataList] = useState(location.state?.dataList || []);
  const [filteredDataList, setFilteredDataList] = useState(
    location.state?.filteredDataList || []
  );
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedCategory || ""
  );
  const [searchQuery, setSearchQuery] = useState(
    location.state?.searchQuery || ""
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(
    location.state?.currentPage || 1
  );
  const [plantsPerPage] = useState(8);

  // Debounced search query
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (!location.state) {
      fetchPlants(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch]);

  const fetchPlants = async (page = 1, limit = 8) => {
    try {
      const response = await axiosFetch.get(
        `/Plant/?page=${page}&limit=${limit}`
      );
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
  const handleImageModalClose = () => setImageModalOpen(false);

  const handleViewDiseases = (plantId) => {
    navigate(`/dashboard/user-plant/diseases/${plantId}`, {
      state: {
        dataList,
        filteredDataList,
        currentPage,
        selectedCategory,
        searchQuery,
      },
    });
  };

  // Pagination calculations
  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = filteredDataList
    .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
    .slice(indexOfFirstPlant, indexOfLastPlant);
  const totalPages = Math.ceil(filteredDataList.length / plantsPerPage);

  return (
    <div className="mt-10 p-4 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div data-aos="flip-up" data-aos-duration="1000">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Plant Details
            </h2>
            <h6 className="text-sm text-gray-500 dark:text-gray-200">
              View plant details
            </h6>
          </div>
        </div>

        <div
          className="mb-4 flex flex-col sm:flex-row justify-between items-center"
          data-aos="flip-up"
          data-aos-duration="1000"
        >
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="border p-2 rounded dark:bg-gray-700 dark:text-white w-full sm:w-auto"
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
          <SearchBar onSearch={setSearchQuery} />
        </div>

        <LargeModal
          isOpen={addModalOpen}
          onClose={handleModalClose}
          title={selectedPlant ? selectedPlant.name : ""}
        >
          <div
            className="p-6 bg-gray-50 rounded-lg dark:bg-gray-700 "
            data-aos="fade-in"
            data-aos-duration="1000"
          >
            {selectedPlant && (
              <div className="flex flex-col space-y-4">
                <img
                  src={selectedPlant.imageUrl}
                  alt="Plant"
                  className="w-full h-64 object-cover mb-4 rounded-lg shadow-lg border border-gray-300 cursor-pointer"
                  loading="lazy"
                  onClick={() => setImageModalOpen(true)}
                />
                <div className="text-gray-700 space-y-3 dark:text-white">
                  <p className="text-lg font-semibold">
                    <strong>Name:</strong> {selectedPlant.name}
                  </p>
                  <p className="text-sm">
                    <strong>Description:</strong> {selectedPlant.description}
                  </p>
                  <p className="text-sm">
                    <strong>Climate:</strong> {selectedPlant.climate}
                  </p>
                  <p className="text-sm">
                    <strong>Soil pH:</strong> {selectedPlant.soilPh}
                  </p>
                  <p className="text-sm">
                    <strong>Land Preparation:</strong>{" "}
                    {selectedPlant.landPreparation}
                  </p>
                  <p className="text-sm">
                    <strong>Fertilizers:</strong>{" "}
                    {selectedPlant.fertilizers.join(", ")}
                  </p>
                </div>
                <button
                  className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                  onClick={() => handleViewDiseases(selectedPlant._id)}
                >
                  View Diseases
                </button>
                <button
                  onClick={handleModalClose}
                  className="mt-4 sm:hidden bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </LargeModal>

        {/* Image Modal with close button */}
        {selectedPlant && (
          <LargeModal
            isOpen={imageModalOpen}
            onClose={handleImageModalClose}
            title={selectedPlant.name}
          >
            <div className="p-4">
              <img
                src={selectedPlant.imageUrl}
                alt={selectedPlant.name}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg duration-300"
              />
            </div>
          </LargeModal>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {currentPlants.length ? (
            currentPlants.map((plant) => (
              <Card
                key={plant._id}
                plant={plant}
                handleViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <div className="col-span-full text-center p-4 text-gray-500 font-semibold">
              No plants found.
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Plant;
