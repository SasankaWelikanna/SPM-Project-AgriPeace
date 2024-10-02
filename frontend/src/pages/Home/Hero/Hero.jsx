import React from "react";
import bgImg from "../../../assets/banner-1.jpg";
import { Link, NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="min-h-screen flex justify-center lg:justify-start items-center text-white bg-black bg-opacity-50">
        <div className="text-center lg:text-left px-6 md:px-12 lg:px-24">
          <div className="space-y-4">
            <p className="md:text-4xl text-2xl text-white font-semibold">Cultivating a</p>
            <h1 className="md:text-7xl text-4xl font-bold leading-tight">
              Brighter Future Together
            </h1>

            <div className="md:w-1/2">
              <p className="mt-4 text-lg text-white opacity-90">
                Empowering farmers with innovative solutions and expert
                guidance. From soil testing to sustainable farming practices, we
                provide comprehensive services to help you achieve success in
                the field.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-5 mt-6">
              <Link to={'/login'}>
                <button className="px-7 py-3 rounded-lg bg-secondary font-bold uppercase hover:scale-105 transition duration-300">
                  Join Today
                </button>
              </Link>

              <NavLink to={'/services'}>
                <button className="px-7 py-3 rounded-lg border border-white hover:bg-secondary font-bold uppercase transition duration-300">
                  Explore Our Services
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
