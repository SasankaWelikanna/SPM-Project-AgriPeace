import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import AdminStats from "./AdminStats";
import PlantCount from "../../../components/Counts/PlantCount";
import DiseaseCount from "../../../components/Counts/DiseaseCount";
import FertilizerCount from "../../../components/Counts/FertilizerCount";
import PlantSlider from "../../../components/Sliders/PlantSlider";
import PlantCategoryChart from "../../../components/Graphs/PlantCategoryChart";
import FertilizerCategoryChart from "../../../components/Graphs/FertilizerCategoryChart";
import FertilizerCategoryPieChart from "../../../components/Graphs/FertilizercategoryPieChart";

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
      <div className="flex justify-between sm:flex-row gap-20 w-full">
        <div data-aos="slide-right" data-aos-duration="1500">
          <FertilizerCategoryPieChart className="w-full sm:w-1/2" />
        </div>
        <div
          className="sm:w-1/2"
          data-aos="slide-left"
          data-aos-duration="1500"
        >
          <PlantSlider />
        </div>
      </div>
      <div
        className="flex flex-col sm:flex-row gap-4 w-full"
        data-aos="slide-up"
        data-aos-duration="1500"
      >
        <PlantCategoryChart className="w-full sm:w-1/2" />
      </div>
    </div>
  );
};

export default AdminHome;
