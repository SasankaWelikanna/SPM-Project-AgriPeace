import React from "react";
import useUser from "../../../hooks/useUser";
import { Link } from "react-router-dom";
import LocationCount from "../../../components/Counts/LocationCount";
import CropsCount from "../../../components/Counts/CropsCount";
import Weather from "../../../components/Weather/Weather";
import CurrentDateTime from "../../../components/CurrentDateTime/CurrentDateTime";

const FarmerHome = () => {
  const { currentUser } = useUser();

  return (
    <div className="mt-5 flex justify-center items-center">
      <div>
        <h1 className="text-4xl capitalize font-bold dark:text-white">
          Hi,{" "}
          <span className="text-secondary items-stretch">
            {currentUser?.name}!
          </span>{" "}
          Welcome to your dashboard{" "}
        </h1>
        <div className="items-center justify-center">
          <div
            className="flex flex-col sm:flex-row gap-2 relative w-full"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <LocationCount />
            <CropsCount />
          </div>
          <div className="flex flex-row gap-2 mt-5 ">
            <Weather />
            <CurrentDateTime />
          </div>
        </div>

        {/* Uncomment if you want to add links */}
        {/* <div className="text-center">
          <h2 className="font-bold dark:text-gray-300">
            You can jump any page you want from here.
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
