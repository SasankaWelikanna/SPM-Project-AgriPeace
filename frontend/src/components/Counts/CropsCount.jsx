import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { RiPlantFill } from "react-icons/ri";

const CropsCount = () => {
  const [cropCount, setCropCount] = useState(0);
  const axiosSecure = useAxiosSecure();

  const fetchCropCount = async () => {
    try {
      const response = await axiosSecure.get("api/crops/");
      // Assuming response.data is an array of Crops
      setCropCount(response.data.length);
    } catch (error) {
      console.error("Error fetching Crops:", error);
    }
  };

  useEffect(() => {
    fetchCropCount();
  }, []);

  return (
    <div>
      <div className=" relative w-full gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow dark:bg-gray-800">
          <div className="p-4 bg-green-400">
            <RiPlantFill className="text-5xl text-white" />
          </div>
          <div className="px-4 text-gray-700 dark:text-white">
            <h3 className="text-sm tracking-wider">Total Crops</h3>
            <p className="text-3xl">{cropCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropsCount;
