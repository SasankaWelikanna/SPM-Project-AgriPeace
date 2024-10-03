import React from "react";
import useUser from "../../../hooks/useUser";
import { Link } from "react-router-dom";
import LocationCount from "../../../components/Counts/LocationCount";
import CropsCount from "../../../components/Counts/CropsCount";
import Weather from "../../../components/Weather/Weather";
import CurrentDateTime from "../../../components/CurrentDateTime/CurrentDateTime";
import Time from "../../../components/CurrentDateTime/Time";
import PlantSlider from "../../../components/Sliders/PlantSlider";
import { FaArrowRight } from "react-icons/fa";
import FertilizerCategoryPieChart from "../../../components/Graphs/FertilizercategoryPieChart";

const FarmerHome = () => {
  const { currentUser } = useUser();

  return (
    <div className="mt-5 flex justify-center items-center sm:px-6 lg:px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl capitalize font-bold dark:text-white text-center">
          Hi,{" "}
          <span className="text-secondary items-stretch">
            {currentUser?.name}!
          </span>{" "}
          Welcome to your dashboard{" "}
        </h1>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col sm:flex-row gap-2 mt-5 ">
            <CurrentDateTime />
            <Weather />
            <Time />
          </div>
          <div className="flex flex-col sm:flex-row gap-2  mt-5">
            <LocationCount />
            <CropsCount />
          </div>
          <div className="flex  sm:flex-row gap-2 w-full my-5">
            <div className="dark:bg-gray-800 rounded-lg mt-5 shadow-xl">
              <Link to={"/dashboard/user-plant"}>
                <div className="flex gap-x-3 items-center mx-4 my-4">
                  <h3 className="font-bold dark:text-white">
                    See About Plants
                  </h3>
                  <FaArrowRight className="text-secondary" />
                </div>
              </Link>

              <PlantSlider />
            </div>
            <div className="dark:bg-gray-800 rounded-lg mt-5 shadow-xl">
              <Link to={"/dashboard/user-fertilizer"}>
                <FertilizerCategoryPieChart />
              </Link>
            </div>
          </div>
        </div>

        {/* Uncomment if you want to add links */}
        {/* <div className="text-center mt-5">
          <h2 className="font-bold dark:text-gray-300">
            You can jump to any page you want from here.
          </h2>
          <div className="flex items-center justify-center my-4 gap-3 flex-wrap">
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:scale-110 duration-300 hover:text-white px-2 py-1 dark:text-white">
              <Link to="/dashboard/user-profile">Your Profile</Link>
            </div>
            <div className="border border-secondary rounded-lg hover:bg-secondary hover:scale-110 duration-300 hover:text-white px-2 py-1 dark:text-white">
              <Link to="/dashboard/my-payments">Payment History</Link>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FarmerHome;
