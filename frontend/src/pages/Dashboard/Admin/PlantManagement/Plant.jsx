import React, { useEffect, useState } from "react";
import axios from "axios";
import { BlobProvider } from "@react-pdf/renderer";
import SearchBar from "./SearchBar";
// import Excel from "../../../../assests/img/icons/excel.png";
// import Pdf from "../../../../assests/img/icons/pdf.png";
// import Refresh from "../../../../assests/img/icons/refresh.png";
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";
import PlantForm from "./PlantForm";
import PlantReport from "./PlantReport";
import { ToastContainer, toast } from "react-toastify";

// import SpinnerModal from "../../../spinner/SpinnerModal";

axios.defaults.baseURL = "http://localhost:8070/";

function Plant() {
  // const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // useEffect(() => {
  //   // Fetch data
  //   getFetchData();
  //   // Simulate loading for 3 seconds
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  //   // Clear timeout on component unmount
  //   return () => clearTimeout(timeout);
  // }, []);

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
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

  const generateExcelFile = () => {
    const rearrangedDataList = dataList.map((plant) => ({
      Name: plant.name,
      Date: plant.date,
      Description: plant.description,
    }));

    const ws = XLSX.utils.json_to_sheet(rearrangedDataList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Plant Report");
    writeFile(wb, "plant_report.xlsx");
  };

  const handleButtonClick = () => {
    getFetchData();
    generateExcelFile();
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalOpen = (plant) => {
    setSelectedPlant(plant);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

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
      await axios.post("/Plant/add", {
        ...formData,
        imageUrl: formData.imageUrl,
      });
      toast.success("Fruit Type Added!");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/Plant/update/${formData._id}`, {
        ...formData,
        imageUrl: formData.imageUrl,
      });
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
    setDeleteId(null); // Reset deleteId after closing the modal
  };

  return (
    <div id="main" className="main">
      <br />
      <br />

      {/* {loading ? ( // Display spinner while loading is true
        <SpinnerModal show={loading} />
      ) : ( */}
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div class="page-header">
            <div class="add-item d-flex">
              <div class="card-title">
                Plant Details
                <h6>Manage plant details</h6>
              </div>
            </div>
            <ul class="table-top-head">
              <li>
                <BlobProvider
                  document={<PlantReport dataList={dataList} />}
                  fileName="PlantReport.pdf"
                >
                  {({ url, blob }) => (
                    <div className="button-container">
                      <a href={url} target="_blank">
                        {/* <img src={Pdf} alt="Pdf Icon" className="icon" /> */}
                      </a>
                    </div>
                  )}
                </BlobProvider>
              </li>
              <li>
                <div className="button-container">
                  <a href="#" onClick={handleButtonClick}>
                    {/* <img src={Excel} alt="Excel Icon" className="icon" /> */}
                  </a>
                </div>
              </li>
              <li>
                <div className="button-container">
                  <a href="#" onClick={handleRefreshClick}>
                    {/* <img src={Refresh} alt="Refresh Icon" className="icon" /> */}
                  </a>
                </div>
              </li>
            </ul>
            <div class="page-btn">
              <button
                type="button"
                className="btn btn-added"
                onClick={handleAddModalOpen}
              >
                <i className="bi bi-plus-circle"></i> Add Plant
              </button>
            </div>
          </div>
          {/* <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Plant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PlantForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>
          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Plant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PlantForm
                handleSubmit={handleEditSubmit}
                initialData={selectedPlant}
              />
            </Modal.Body>
          </Modal>
          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this record?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => handleDelete(deleteId)}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal> */}
          <div className="table-container">
            <SearchBar onSearch={handleSearch} />
            <br />
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDataList.length ? (
                  filteredDataList.map((plant) => (
                    <tr key={plant._id}>
                      <td>
                        {plant.imageUrl && (
                          <img
                            src={plant.imageUrl}
                            alt="Fruit Image"
                            style={{ width: "50px", height: "50px" }}
                          />
                        )}
                      </td>
                      <td>{plant.name}</td>
                      <td>{plant.date}</td>
                      <td className="description">{plant.description}</td>
                      <td>
                        <div className="buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditModalOpen(plant)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleShowDeleteModal(plant._id)}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* )} */}
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
