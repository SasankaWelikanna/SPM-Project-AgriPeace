import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { RiPlantFill } from "react-icons/ri";
import { FaDisease } from "react-icons/fa";

const DiseaseCount = () => {
  const [diseaseCount, setDiseaseCount] = useState(0);
  const axiosSecure = useAxiosSecure();

  const fetchDiseaseCount = async () => {
    try {
      const response = await axiosSecure.get("api/diseases/");
      // Assuming response.data is an array of diseases
      setDiseaseCount(response.data.length);
    } catch (error) {
      console.error("Error fetching diseases:", error);
    }
  };

  useEffect(() => {
    fetchDiseaseCount();
  }, []);

  return (
    <div>
      <div className=" gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow dark:bg-gray-800">
          <div className="p-4 bg-green-400">
            <FaDisease className="text-5xl text-white" />
          </div>
          <div className="px-4 text-gray-700 dark:text-white">
            <h3 className="text-sm tracking-wider">Total Diseases</h3>
            <p className="text-3xl">{diseaseCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseCount;
