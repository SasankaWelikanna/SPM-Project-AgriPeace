import React, { useEffect, useState } from "react";
import axios from "axios";
// import { BlobProvider } from "@react-pdf/renderer";
import SearchBar from "./SearchBar";
// import * as XLSX from "xlsx";
// import { writeFile } from "xlsx";
import Modal from "./Modal";
import PlantForm from "./PlantForm";
import PlantReport from "./PlantReport";
import { ToastContainer, toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:8070/";

function Plant() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    getFetchData();
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList);
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Plant/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSearch = (query) => {
    const filteredList = dataList.filter((plant) => {
      const fullName = `${plant.name} ${plant.date}`;
      return fullName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredDataList(filteredList);
  };

  const handleRefreshClick = () => {
    getFetchData();
  };

  // const generateExcelFile = () => {
  //   const rearrangedDataList = dataList.map((plant) => ({
  //     Name: plant.name,
  //     Date: plant.date,
  //     Description: plant.description,
  //   }));

  //   const ws = XLSX.utils.json_to_sheet(rearrangedDataList);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Plant Report");
  //   writeFile(wb, "plant_report.xlsx");
  // };

  // const handleButtonClick = () => {
  //   getFetchData();
  //   generateExcelFile();
  // };

  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  const handleEditModalOpen = (plant) => {
    setSelectedPlant(plant);
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => setEditModalOpen(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Plant/delete/${id}`);
      toast.success("Successfully Deleted!");
      getFetchData();
      handleCloseDeleteModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      await axios.post("/Plant/add", formData);
      toast.success("Fruit Type Added!");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/Plant/update/${formData._id}`, formData);
      toast.success("Plant Updated");
      handleEditModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
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

  return (
    <div id="main" className="main p-4 bg-gray-50">
      <br />
      <br />
      <div className="card bg-white shadow-md rounded-lg overflow-auto">
        <div className="card-body p-6">
          <div className="page-header flex justify-between items-center mb-4">
            <div className="add-item flex items-center">
              <div className="card-title">
                <h2 className="text-xl font-semibold text-gray-700">
                  Plant Details
                </h2>
                <h6 className="text-sm text-gray-500">Manage plant details</h6>
              </div>
            </div>
            <ul className="flex space-x-4">
              {/* <li>
                <BlobProvider
                  document={<PlantReport dataList={dataList} />}
                  fileName="PlantReport.pdf"
                >
                  {({ url }) => (
                    <div className="button-container">
                      <a
                        href={url}
                        target="_blank"
                        className="text-blue-500 hover:underline"
                      >
                        PDF Report
                      </a>
                    </div>
                  )}
                </BlobProvider>
              </li> */}
              <li>
                <div className="button-container">
                  <a
                    href="#"
                    // onClick={handleButtonClick}
                    className="text-green-500 hover:underline"
                  >
                    Excel Report
                  </a>
                </div>
              </li>
              <li>
                <div className="button-container">
                  <a
                    href="#"
                    onClick={handleRefreshClick}
                    className="text-blue-500 hover:underline"
                  >
                    Refresh
                  </a>
                </div>
              </li>
            </ul>
            <div className="page-btn">
              <button
                type="button"
                className="btn btn-added bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={handleAddModalOpen}
              >
                <i className="bi bi-plus-circle"></i> Add Plant
              </button>
            </div>
          </div>

          {/* Add Plant Modal */}
          <Modal
            isOpen={addModalOpen}
            onClose={handleAddModalClose}
            title="Add Plant"
          >
            <PlantForm handleSubmit={handleAddSubmit} />
          </Modal>

          {/* Edit Plant Modal */}
          <Modal
            isOpen={editModalOpen}
            onClose={handleEditModalClose}
            title="Edit Plant"
          >
            <PlantForm
              handleSubmit={handleEditSubmit}
              initialData={selectedPlant}
            />
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal
            isOpen={showDeleteModal}
            onClose={handleCloseDeleteModal}
            title="Confirm Delete"
          >
            <p>Are you sure you want to delete this record?</p>
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 mr-4 bg-gray-300 rounded hover:bg-gray-400"
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

          <div className="table-container mt-6">
            <SearchBar onSearch={handleSearch} />
            <br />
            <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDataList.length ? (
                  filteredDataList.map((plant) => (
                    <tr key={plant._id} className="border-b">
                      <td className="p-4">
                        {plant.imageUrl && (
                          <img
                            src={plant.imageUrl}
                            alt="Fruit Image"
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        )}
                      </td>
                      <td className="p-4">{plant.name}</td>
                      <td className="p-4">{plant.date}</td>
                      <td className="p-4">{plant.description}</td>
                      <td className="p-4 flex space-x-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleEditModalOpen(plant)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleShowDeleteModal(plant._id)}
                        >
                          Delete
                        </button>
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
          </div>
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

export default Plant;
