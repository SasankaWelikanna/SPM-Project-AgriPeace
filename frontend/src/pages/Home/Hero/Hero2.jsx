import React from "react";
import bgImg from "../../../assets/banner-2.jpg";
import { Link, NavLink } from "react-router-dom";

const Hero2 = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="min-h-screen flex justify-center lg:justify-start items-center text-white bg-black bg-opacity-50">
        <div className="text-center lg:text-left px-6 md:px-12 lg:px-24">
          <div className="space-y-4">
            <p className="md:text-4xl text-2xl text-white font-semibold">Sowing the Seeds of</p>
            <h1 className="md:text-7xl text-4xl font-bold leading-tight">
              Innovation in Agriculture
            </h1>

            <div className="md:w-1/2">
              <p className="mt-4 text-lg text-white opacity-90">
                Dedicated to providing farmers with cutting-edge tools and
                insights. Our comprehensive services range from precision
                farming techniques to expert crop planning, ensuring your farm
                thrives with maximum efficiency and sustainability.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-5 mt-6">
              <Link to={'/login'}>
                <button className="px-7 py-3 rounded-lg bg-secondary font-bold uppercase hover:scale-105 transition duration-300">
                  Join Today
                </button>
              </Link>
              
              <NavLink to={'/products'}>
              <button className="px-7 py-3 rounded-lg border border-white hover:bg-secondary font-bold uppercase transition duration-300">
                Discover Our Products
              </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
