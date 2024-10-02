import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { useNavigate, useLocation } from "react-router-dom";
import LargeModal from "../../../../components/Modal/LargeModal";
import SearchBar from "../../../../components/Search/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../../../components/Pagination/Pagination";
import useDebounce from "../../../../hooks/useDebounce";
import Card from "../../../../components/Card/Card";

function Fertilizer() {
  const axiosFetch = useAxiosFetch();
  const navigate = useNavigate();
  const location = useLocation();

  const [dataList, setDataList] = useState(location.state?.dataList || []);
  const [filteredDataList, setFilteredDataList] = useState(
    location.state?.filteredDataList || []
  );
  const [selectedFertilizer, setSelectedFertilizer] = useState(null);
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
  const [fertilizersPerPage] = useState(8);

  // Debounced search query
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (!location.state) {
      fetchFertilizers(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch]);

  const fetchFertilizers = async (page = 1, limit = 8) => {
    try {
      const response = await axiosFetch.get(
        `/Fertilizer/?page=${page}&limit=${limit}`
      );
      if (Array.isArray(response.data)) {
        setDataList(response.data);
        setFilteredDataList(response.data);
      } else {
        console.error("Unexpected data format:", response.data);
        toast.error("Unexpected data format from server.");
      }
    } catch (err) {
      console.error("Error fetching fertilizers:", err);
      toast.error("Failed to fetch fertilizers.");
    }
  };

  const handleSearch = (query) => {
    const filteredList = dataList.filter((fertilizer) => {
      const fullName = `${fertilizer.productName} ${fertilizer.description}`;
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
        (fertilizer) => fertilizer.category === category
      );
      setFilteredDataList(filteredList);
    }
  };

  const handleViewDetails = (fertilizer) => {
    setSelectedFertilizer(fertilizer);
    setAddModalOpen(true);
  };

  const handleModalClose = () => setAddModalOpen(false);
  const handleImageModalClose = () => setImageModalOpen(false);

  const handleViewDiseases = (fertilizerId) => {
    navigate(`/dashboard/user-fertilizer/diseases/${fertilizerId}`, {
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
  const indexOfLastFertilizer = currentPage * fertilizersPerPage;
  const indexOfFirstFertilizer = indexOfLastFertilizer - fertilizersPerPage;
  const currentFertilizers = filteredDataList.slice(
    indexOfFirstFertilizer,
    indexOfLastFertilizer
  );
  const totalPages = Math.ceil(filteredDataList.length / fertilizersPerPage);

  return (
    <div className="mt-10 p-4 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Fertilizer Details
            </h2>
            <h6 className="text-sm text-gray-500">View fertilizer details</h6>
          </div>
          
          {/* Button to access the Fertilizer Calculator*/}

          <button onClick={() => navigate(`/dashboard/fertilizer-cal`)}
            className="bg-secondary hover:scale-105 text-white py-2 px-4 rounded-lg">
            Fertilizer Calculator
          </button>
      
        </div>

        <div className="mb-4 flex justify-between items-center">
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="border p-2 rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Categories</option>
            {[...new Set(dataList.map((fertilizer) => fertilizer.category))].map(
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
          title={selectedFertilizer ? selectedFertilizer.productName : ""}
        >
          <div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-700">
            {selectedFertilizer && (
              <div className="flex flex-col space-y-4">
                <img
                  src={selectedFertilizer.imageUrl}
                  alt="Fertilizer"
                  className="w-full h-64 object-cover mb-4 rounded-lg shadow-lg border border-gray-300 cursor-pointer"
                  loading="lazy"
                  onClick={() => setImageModalOpen(true)}
                />
                <div className="text-gray-700 space-y-3 dark:text-white">
                  <p className="text-lg font-semibold">
                    <strong>Name:</strong> {selectedFertilizer.productName}
                  </p>
                  <p className="text-sm">
                    <strong>Description:</strong> {selectedFertilizer.description}
                  </p>
                  <p className="text-sm">
                    <strong>Category:</strong> {selectedFertilizer.category}
                  </p>
                  <p className="text-sm">
                    <strong>Usage:</strong> {selectedFertilizer.usage}
                  </p>
                </div>
                
              </div>
            )}
          </div>
        </LargeModal>

        {/* Image Modal for larger view */}
        {selectedFertilizer && (
          <LargeModal
            isOpen={imageModalOpen}
            onClose={handleImageModalClose}
            title={selectedFertilizer.productName}
          >
            <div className="p-4">
              <img
                src={selectedFertilizer.imageUrl}
                alt={selectedFertilizer.productName}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg duration-300"
              />
            </div>
          </LargeModal>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {currentFertilizers.length ? (
            currentFertilizers.map((fertilizer) => (
              <Card
                key={fertilizer._id}
                plant={fertilizer} // Assuming `plant` prop can be used here as well, change if needed
                handleViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <div className="col-span-full text-center p-4 text-gray-500 font-semibold">
              No fertilizers found.
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Fertilizer;
