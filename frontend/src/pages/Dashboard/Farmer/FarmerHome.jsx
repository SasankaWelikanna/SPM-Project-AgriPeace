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
    <div className="mt-5 flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        <h1
          className="text-2xl sm:text-4xl capitalize font-bold dark:text-white text-center "
          data-aos="slide-down"
          data-aos-duration="1500"
        >
          Hi, <span className="text-secondary">{currentUser?.name}!</span>{" "}
          Welcome to your dashboard
        </h1>

        <div className="flex flex-col items-center justify-center mt-5">
          <div
            className="flex flex-col sm:flex-row gap-2 mt-5 w-full justify-center"
            data-aos="flip-up"
            data-aos-duration="1000"
          >
            <CurrentDateTime />
            <Weather />
            <Time />
          </div>

          <div
            className="flex flex-col sm:flex-row gap-2  w-full justify-center"
            data-aos="flip-up"
            data-aos-duration="1000"
          >
            <LocationCount />
            <CropsCount />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full my-5">
            <div
              className="dark:bg-gray-800 rounded-lg shadow-xl w-full sm:w-1/2"
              data-aos="slide-up"
              data-aos-duration="1000"
            >
              <Link to={"/dashboard/user-plant"}>
                <div className="flex gap-x-3 items-center mx-4 my-6">
                  <h3 className="font-bold dark:text-white">
                    See About Plants
                  </h3>
                  <FaArrowRight className="text-secondary" />
                </div>
              </Link>
              <PlantSlider />
            </div>

            <div
              className="dark:bg-gray-800 rounded-lg shadow-xl w-full sm:w-1/2 pr-10 py-4"
              data-aos="slide-up"
              data-aos-duration="1000"
            >
              <Link to={"/dashboard/user-fertilizer"}>
                <FertilizerCategoryPieChart />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerHome;
