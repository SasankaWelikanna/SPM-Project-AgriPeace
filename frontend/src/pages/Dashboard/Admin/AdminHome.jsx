import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import { Link } from "react-router-dom";
import AdminStats from "./AdminStats";
import PlantCount from "../../../components/Counts/PlantCount";
import DiseaseCount from "../../../components/Counts/DiseaseCount";
import FertilizerCount from "../../../components/Counts/FertilizerCount";
import PlantSlider from "../../../components/Sliders/PlantSlider";
import PlantCategoryChart from "../../../components/Graphs/PlantCategoryChart";
import FertilizerCategoryPieChart from "../../../components/Graphs/FertilizercategoryPieChart";
import { FaArrowRight } from "react-icons/fa";

const AdminHome = () => {
  const { currentUser } = useUser();
  const axiosFetch = useAxiosFetch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosFetch
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4">
      <h1
        className="text-4xl font-bold my-7 dark:text-white"
        data-aos="fade-in"
        data-aos-duration="2000"
      >
        Welcome Back,{" "}
        <span className="text-secondary">{currentUser?.name}</span>!
      </h1>
      <div
        className="flex flex-col sm:flex-row gap-2 relative w-full"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <AdminStats users={users} />
        <PlantCount />
        <DiseaseCount />
        <FertilizerCount />
      </div>
      <div className="flex justify-between sm:flex-row gap-20 ">
        <div
          className="dark:bg-gray-800 rounded-xl mt-14 pt-4 pr-8 shadow-xl"
          data-aos="slide-right"
          data-aos-duration="1500"
        >
          <FertilizerCategoryPieChart className=" sm:w-1/2" />
        </div>
        <div
          className="sm:w-1/2 mt-10"
          data-aos="slide-left"
          data-aos-duration="1500"
        >
          <div className="dark:bg-gray-800 rounded-lg w-fit shadow-xl">
            <h3 className="font-bold my-2 mx-4 mt-4 dark:text-white">
              <Link to={"/dashboard/manage-plant"}>
                <div className="flex gap-x-3 items-center py-2">
                  <h3 className="font-bold dark:text-white">
                    See Plant Details
                  </h3>
                  <FaArrowRight className="text-secondary" />
                </div>
              </Link>
            </h3>
            <PlantSlider />
          </div>
        </div>
      </div>
      <div className="dark:bg-gray-800 rounded-xl my-4 pt-4 pr-8 shadow-xl">
        <PlantCategoryChart className="w-full sm:w-1/2" />
      </div>
    </div>
  );
};

export default AdminHome;
