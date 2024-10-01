import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import AdminStats from "./AdminStats";
import PlantCount from "../../../components/Counts/PlantCount";
import DiseaseCount from "../../../components/Counts/DiseaseCount";
import FertilizerCount from "../../../components/Counts/FertilizerCount";
import PlantSlider from "../../../components/Sliders/PlantSlider";

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
      <div className="flex flex-row gap-4 w-full">
        <AdminStats users={users} />
        <PlantCount />
        <DiseaseCount />
        <FertilizerCount />
      </div>
      <PlantSlider />
    </div>
  );
};

export default AdminHome;
