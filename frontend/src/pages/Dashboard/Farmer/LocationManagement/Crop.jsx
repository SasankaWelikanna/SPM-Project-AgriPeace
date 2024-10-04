import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../../../components/Modal/Modal";
import CropForm from "./CropForm";
import SearchBar from "../../../../components/Search/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete, MdOutlineArrowBackIosNew } from "react-icons/md";
import { FaEdit, FaFileExcel, FaFilePdf } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";
import CropReport from "./CropReport";
import { BlobProvider } from "@react-pdf/renderer";
import { HiRefresh } from "react-icons/hi";

function Crop() {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { locationId } = useParams();
  const [crop, setCrop] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [location, setLocation] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  //weather API
  const [temperature, setTemperature] = useState(null);
  const [rainfall, setRainfall] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [cropsPerPage] = useState(5); // Number of diseases per page

  const [totalLandSize, setTotalLandSize] = useState(0);
  const [usedLandSize, setUsedLandSize] = useState(0);

  useEffect(() => {
    fetchCrops();
    fetchLocation();
  }, [locationId]);

  useEffect(() => {
    setFilteredCrops(dataList);
    calculateUsedLandSize(dataList);
  }, [dataList]);

  const fetchCrops = async () => {
    try {
      const response = await axiosFetch.get(
        `/api/crops/location/${locationId}`
      );
      console.log("Fetched Crops Data:", response.data); // Debug log
      // Verify the data structure
      if (Array.isArray(response.data)) {
        setDataList(response.data);
        setCrop(response.data);
        setFilteredDataList(response.data);
        calculateUsedLandSize(response.data);
      } else {
        console.error("Unexpected data format:", response.data);
        toast.error("Unexpected data format from server.");
      }
    } catch (err) {
      console.error("Error fetching crops:", err);
      toast.error("Failed to fetch crops.");
    }
  };

  const fetchLocation = async () => {
    try {
      const response = await axiosFetch.get(`/Location/${locationId}`);
      if (response.data && response.data.city) {
        setLocation(response.data.city);
        setTotalLandSize(extractNumbers(response.data.areaSize)[0] || 0);
        fetchWeatherData(response.data.city);
      } else {
        console.error("Location not found:", response.data);
        toast.error("Failed to fetch location.");
      }
    } catch (err) {
      console.error("Error fetching crops details:", err);
      toast.error("Failed to fetch crops details.");
    }
  };

  // Fetch weather data from OpenWeatherMap API
  const fetchWeatherData = async (city) => {
    const apiKey = "ac180212c769edd1643ef7a93bc9d33e";
    try {
      if (!city) {
        throw new Error("City name is missing");
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data.main) {
        setTemperature(data.main.temp);
        setRainfall(data.rain ? data.rain["1h"] : 0);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
      } else {
        throw new Error("Weather data is incomplete");
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      toast.error(`Failed to fetch weather data: ${err.message}`);
    }
  };

  const handleSearch = (query) => {
    const filteredList = dataList.filter((crop) => {
      const cropName = `${crop.cropName}`;
      return cropName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredCrops(filteredList);
  };

  const generateExcelFile = () => {
    const rearrangedDataList = dataList.map((crop) => ({
      Crop_Name: crop.cropName,
      Crop_Type: crop.cropType,
      Land_Size: crop.landSize,
      Planting_Quantity: crop.plantingQuantity,
      Expected_Quantity: crop.expectedQuantity,
      Planting_Date: crop.plantingDate,
      Expected_Date: crop.expectedDate,
    }));

    const ws = XLSX.utils.json_to_sheet(rearrangedDataList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Crop Report");
    writeFile(wb, "crop_report.xlsx");
  };

  const handleButtonClick = () => {
    generateExcelFile();
  };

  const handleRefreshClick = () => {
    fetchCrops();
  };

  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  const handleEditModalOpen = (crop) => {
    setSelectedCrop(crop);
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => setEditModalOpen(false);

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/api/crops/${id}`);
      toast.success("Successfully Deleted!");
      fetchCrops(); // Ensure data is refreshed after deletion
      handleCloseDeleteModal();
    } catch (err) {
      console.error("Error deleting crop:", err);
      toast.error("Failed to delete crop.");
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axiosSecure.post("/api/crops", { ...formData, locationId });
      toast.success("Crop Added!");
      handleAddModalClose();
      fetchCrops(); // Refresh data after adding a crop
    } catch (err) {
      console.error("Error adding crop:", err);
      toast.error("Failed to add crop.");
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axiosSecure.put(`/api/crops/${formData._id}`, formData);
      toast.success("Crop Updated!");
      handleEditModalClose();
      fetchCrops(); // Refresh data after editing a crop
    } catch (err) {
      console.error("Error updating crop:", err);
      toast.error("Failed to update crop.");
    }
  };

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const extractNumbers = (str) => {
    const numbers = str.match(/(\d+(\.\d+)?)/g); // Regex to capture integers and decimals
    return numbers ? numbers.map(Number) : [];
  };  

  const calculateUsedLandSize = (crops) => {
    const total = crops.reduce((sum, crop) => sum + extractNumbers(crop.landSize)[0], 0);
    setUsedLandSize(total);
  };



  // Get current crops for pagination
  const indexOfLastCrop = currentPage * cropsPerPage;
  const indexOfFirstCrop = indexOfLastCrop - cropsPerPage;
  const currentCrops = filteredCrops.slice(indexOfFirstCrop, indexOfLastCrop);

  const totalPages = Math.ceil(filteredCrops.length / cropsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-10 p-4 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700">
        <Link to="/dashboard/location">
          <MdOutlineArrowBackIosNew className="text-3xl mb-3" />
        </Link>
        <div className="flex justify-between items-center mb-4">
          <div data-aos="flip-up" data-aos-duration="1000">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Crop Details - {location}
            </h2>
            <h6 className="text-sm text-gray-500 dark:text-gray-200">
              Manage crop details
            </h6>
          </div>
          <div className="flex space-x-4" data-aos="flip-up" data-aos-duration="1000">
            <BlobProvider
              document={<CropReport dataList={dataList} />}
              fileName="CropReport.pdf"
            >
              {({ url }) => (
                <li className="flex items-center">
                  <a href={url} target="_blank" className="flex items-center">
                    <FaFilePdf className="text-3xl text-red-600" />
                  </a>
                </li>
              )}
            </BlobProvider>
            <li className="flex items-center">
              <a
                href="#"
                onClick={handleButtonClick}
                className="flex items-center"
              >
                <FaFileExcel className="text-3xl text-green-600" />
              </a>
            </li>
            <button
              className="text-blue-500 hover:underline"
              onClick={handleRefreshClick}
            >
              <HiRefresh className="text-3xl" />
            </button>
            <button
              className="bg-secondary text-white py-2 px-4 rounded-lg"
              onClick={handleAddModalOpen}
            >
              Add Crop
            </button>
          </div>
        </div>

        {/* Add Crop Modal */}
        <Modal
          isOpen={addModalOpen}
          onClose={handleAddModalClose}
          title="Add Crop"
        >
          <CropForm 
            handleSubmit={handleAddSubmit} 
            totalLandSize={totalLandSize}
            usedLandSize={usedLandSize}
          />
        </Modal>

        {/* Edit Crop Modal */}
        <Modal
          isOpen={editModalOpen}
          onClose={handleEditModalClose}
          title="Edit Crop"
        >
          <CropForm
            handleSubmit={handleEditSubmit}
            initialData={selectedCrop}
            totalLandSize={totalLandSize}
            usedLandSize={usedLandSize}
          />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          title="Confirm Delete"
        >
          <p className="dark:text-white">
            Are you sure you want to delete this record?
          </p>
          <div className="mt-6 flex justify-end">
            <button
              className="px-4 py-2 mr-4 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white"
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleDelete(deleteId)}
            >
              Delete
            </button>
          </div>
        </Modal>

        {/* Weather Data */}
        <div className="max-w-sm p-4 bg-white rounded-md shadow-md dark:bg-gray-800"  data-aos="flip-up" data-aos-duration="1000">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
            Current Weather
          </h3>
          <div className="text-center mb-4">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              <strong>Temperature:</strong>{" "}
              {temperature ? `${temperature} °C` : "Loading..."}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              <strong>Rainfall:</strong>{" "}
              {rainfall !== null ? `${rainfall} mm` : "Loading..."}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 dark:text-gray-300">
            <p>
              <strong>Humidity:</strong>{" "}
              {humidity !== null ? `${humidity} %` : "Loading..."}
            </p>
            <p>
              <strong>Wind Speed:</strong>{" "}
              {windSpeed !== null ? `${windSpeed} km/h` : "Loading..."}
            </p>
          </div>
        </div>

        <div data-aos="flip-up" data-aos-duration="1000">
          <SearchBar onSearch={handleSearch} />
        </div>

        <table className="w-full mt-6 bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-900" data-aos="fade-in" data-aos-duration="2000">
          <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
            <tr>
              <th className="p-4 text-left">Crop Name</th>
              <th className="p-4 text-left">Crop Type</th>
              <th className="p-4 text-left">Land Size</th>
              <th className="p-4 text-left">Planting Quantity</th>
              <th className="p-4 text-left">Expected Quantity</th>
              <th className="p-4 text-left">Planting Date</th>
              <th className="p-4 text-left">Expected Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="dark:text-white">
            {currentCrops.length ? (
              currentCrops.map((crop) => (
                <tr key={crop._id} className="border-b">
                  <td className="p-4">{crop.cropName}</td>
                  <td className="p-4">{crop.cropType}</td>
                  <td className="p-4">{crop.landSize}</td>
                  <td className="p-4">{crop.plantingQuantity}</td>
                  <td className="p-4">{crop.expectedQuantity}</td>
                  <td className="p-4">{crop.plantingDate}</td>
                  <td className="p-4">{crop.expectedDate}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleEditModalOpen(crop)}
                    >
                      <FaEdit className="text-3xl" />
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleShowDeleteModal(crop._id)}
                    >
                      <MdDelete className="text-3xl" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mr-2 rounded-lg ${
              currentPage === 1 ? "bg-gray-300" : "bg-secondary text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 ml-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-secondary text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Crop;
