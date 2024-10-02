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
    <div>
      <h1 className="text-4xl font-bold my-7 dark:text-white">
        Welcome Back,{" "}
        <span className="text-secondary">{currentUser?.name}</span> !
      </h1>
      <div className="flex flex-row gap-2 relative w-full">
        <AdminStats users={users} />
        <PlantCount />
        <DiseaseCount />
        <FertilizerCount />
      </div>
      <div className="flex flex-row gap-5 w-full ">
      <FertilizerCategoryPieChart />
        <div className="flex flex-col gap-4 w-full">
        <PlantSlider />
        </div>
      </div>
      <div className="flex flex-row gap-4 w-full">
      <PlantCategoryChart />
      </div>
      
    </div>
  );
};

export default AdminHome;
