import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import LargeModal from "../../../../components/Modal/LargeModal";
import Modal from "../../../../components/Modal/Modal";
import SearchBar from"../../../../components/Search/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";
import { FaEdit, FaFilePdf, FaFileExcel } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";
import FertilizerForm from "./FertilizerForm";
import FertilizerReport from "./FertilizerReport";
import { BlobProvider } from "@react-pdf/renderer";
import Pagination from "../../../../components/Pagination/Pagination"; // Import the Pagination component


function Fertilizer() {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [fertilizer, setFertilizer] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedFertilizer, setSelectedFertilizer] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("");

   // Pagination state
   const [currentPage, setCurrentPage] = useState(1);
   const [fertilizersPerPage] = useState(3); // Adjust as needed

  useEffect(() => {
    fetchFertilizers();
  }, []);

  const fetchFertilizers = async () => {
    try {
      const response = await axiosFetch.get("/Fertilizer/");
      // Verify the data structure
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
      const fullName = `${fertilizer.productName} ${fertilizer.category}`;
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

  const generateExcelFile = () => {
    const rearrangedDataList = dataList.map((fertilizer) => ({
      Product_Name: fertilizer.productName,
      Category: fertilizer.category,
      Description: fertilizer.description,
      Quantity: fertilizer.quantity,
      Price: fertilizer.price,
    }));
  
    const ws = XLSX.utils.json_to_sheet(rearrangedDataList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Fertilizer Report");
    writeFile(wb, "fertilizer_report.xlsx");
  };
  


  const handleRefreshClick = () => {
    fetchFertilizers();
  };
  const handleButtonClick = () => {
    generateExcelFile();
  };

  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  const handleEditModalOpen = (fertilizer) => {
    setSelectedFertilizer(fertilizer);
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => setEditModalOpen(false);

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/Fertilizer/delete/${id}`);
      toast.success("Successfully Deleted!");
      fetchFertilizers(); // Ensure data is refreshed after deletion
      handleCloseDeleteModal();
    } catch (err) {
      console.error("Error deleting fertilizer:", err);
      toast.error("Failed to delete fertilizer.");
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axiosSecure.post("/Fertilizer/add", formData);
      toast.success("Fertilizer Added!");
      handleAddModalClose();
      fetchFertilizers(); // Refresh data after adding a fertilizer
    } catch (err) {
      console.error("Error adding fertilizer:", err);
      toast.error("Failed to add fertilizer.");
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axiosSecure.put(`/Fertilizer/update/${formData._id}`, formData);
      toast.success("Fertilizer Updated!");
      handleEditModalClose();
      fetchFertilizers(); // Refresh data after editing a fertilizer
    } catch (err) {
      console.error("Error updating fertilizer:", err);
      toast.error("Failed to update fertilizer.");
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

  // Pagination calculations
  const indexOfLastFertilizer = currentPage * fertilizersPerPage;
  const indexOfFirstFertilizer = indexOfLastFertilizer - fertilizersPerPage;
  const currentFertilizers = filteredDataList.slice(
    indexOfFirstFertilizer,
    indexOfLastFertilizer
  );
  const totalPages = Math.ceil(filteredDataList.length / fertilizersPerPage);

  return (
    <div className="mt-10 p-4 bg-gray-50  dark:bg-gray-900">
      <div className="bg-white shadow-md rounded-lg p-6  dark:bg-gray-700 ">
        <div className="flex justify-between items-center mb-4 ">
          <div data-aos="flip-up" data-aos-duration="1000">
            <h2 className="text-xl font-semibold text-gray-700  dark:text-white">
              Fertilizer Details
            </h2>
            <h6 className="text-sm text-gray-500  dark:text-white">
              Manage fertilizer details</h6>
          </div>
          <div
            className="flex space-x-4"
            data-aos="flip-up"
            data-aos-duration="1000"
          >
            <BlobProvider
              document={<FertilizerReport dataList={dataList} />}
              fileName="FertilizerReport.pdf"
            >
              {({ url, blob }) => (
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
              className="bg-secondary hover:scale-105 text-white py-2 px-4 rounded-lg"
              onClick={handleAddModalOpen}
            >
              Add Fertilizer
            </button>
          </div>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="border p-2 rounded dark:bg-gray-700 dark:text-white w-full sm:w-auto"
            data-aos="flip-up"
            data-aos-duration="1000"
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
          <div data-aos="flip-up" data-aos-duration="1000">
            <SearchBar
              onSearch={handleSearch}
              data-aos="slide-left"
              data-aos-duration="1000"
            />
          </div>
        </div>


        {/* Add Fertilizer LargeModal */}
        <LargeModal
          isOpen={addModalOpen}
          onClose={handleAddModalClose}
          title="Add Fertilizer"
        >
          <FertilizerForm handleSubmit={handleAddSubmit} />
        </LargeModal>

        {/* Edit Fertilizer LargeModal */}
        <LargeModal
          isOpen={editModalOpen}
          onClose={handleEditModalClose}
          title="Edit Fertilizer"
        >
          <FertilizerForm
            handleSubmit={handleEditSubmit}
            initialData={selectedFertilizer}
          />
        </LargeModal>

        {/* Delete Confirmation LargeModal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          title="Confirm Delete"
        >
          <p className="dark:text-white">Are you sure you want to delete this record?</p>
          <div className="mt-6 flex justify-end">
            <button
              className="px-4 py-2 mr-4 bg-gray-300 rounded hover:bg-gray-400  dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white"
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

        <table className="w-full mt-6 bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-900 dark:text-white" 
          data-aos="fade-in"
          data-aos-duration="2000">
          <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Product Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Weight (kg)</th>
              <th className="p-4 text-left">Average Price (Rs)</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentFertilizers.length ? (
              currentFertilizers.map((fertilizer) => (
                <tr key={fertilizer._id} className="border-b">
                  <td className="p-4">
                    {fertilizer.imageUrl && (
                      <img
                        src={fertilizer.imageUrl}
                        alt="Fertilizer"
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                  </td>
                  <td className="p-4">{fertilizer.productName}</td>
                  <td className="p-4">{fertilizer.category}</td>
                  <td className="p-4">{fertilizer.description}</td>
                  <td className="p-4">{parseFloat(fertilizer.quantity).toFixed(2)}</td>
                  <td className="p-4">{parseFloat(fertilizer.price).toFixed(2)}</td>

                  <td className="p-4">
                  <div className="flex space-x-2">
                        <button
                          className="text-3xl text-blue-600 hover:text-blue-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditModalOpen(fertilizer);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-3xl text-red-600 hover:text-red-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowDeleteModal(fertilizer._id);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
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

export default Fertilizer;
