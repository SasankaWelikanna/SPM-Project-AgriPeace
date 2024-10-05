import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import logo from "/logo.png";
import { BiHomeAlt, BiLogInCircle } from "react-icons/bi";
import { FaUsers, FaUserAlt } from "react-icons/fa";
import { GiFertilizerBag, GiField } from "react-icons/gi";
import { RiPlantFill } from "react-icons/ri";
import { RiDashboardFill } from "react-icons/ri";
import Swal from "sweetalert2";
import Scroll from "../hooks/useScroll";
import Loader from "../components/Loader/Loader";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import { ToastContainer } from "react-toastify";
import { MdOutlineMenuOpen } from "react-icons/md";

const adminNavItems = [
  {
    to: "/dashboard/admin-home",
    icon: <RiDashboardFill className="text-2xl" />,
    label: "Dashboard",
  },
  {
    to: "/dashboard/manage-users",
    icon: <FaUsers className="text-2xl" />,
    label: "Manage Users",
  },
  {
    to: "/dashboard/manage-fertilizers",
    icon: <GiFertilizerBag className="text-2xl" />,
    label: "Fertilizer Management",
  },
  {
    to: "/dashboard/manage-plant",
    icon: <RiPlantFill className="text-2xl" />,
    label: "Plant Mangement",
  },
];

const farmerNavItems = [
  {
    to: "/dashboard/farmer-home",
    icon: <RiDashboardFill className="text-2xl" />,
    label: "Dashboard",
  },
  {
    to: "/dashboard/location",
    icon: <GiField className="text-2xl" />,
    label: "My Locations",
  },
  {
    to: "/dashboard/user-plant",
    icon: <RiPlantFill className="text-2xl" />,
    label: "Plants",
  },
  {
    to: "/dashboard/user-fertilizer",
    icon: <GiFertilizerBag className="text-2xl" />,
    label: "Fertilizers",
  },
];

const lastMenuItems = [
  { to: "/", icon: <BiHomeAlt className="text-2xl" />, label: "Main Home" },
  {
    to: "/dashboard/user-profile",
    icon: <FaUserAlt className="text-2xl" />,
    label: "Profile",
  },
];

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { loader, logout } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const role = currentUser?.role;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure want to logout?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout me!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout().then(
          Swal.fire({
            title: "Logged Out!",
            text: "You have been successfully logged out.",
            icon: "success",
          })
        );
        navigate("/").catch((error) => console.log(error));
      }
    });
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <div className={`flex ${isDarkMode ? "dark" : ""}`}>
      <Scroll />
      <div
        className={`${
          open ? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"
        } bg-white h-screen p-5 md:block hidden pt-8 relative duration-300 dark:bg-gray-700 shadow-lg`}
      >
        <div className="flex gap-x-3 items-center">
          <MdOutlineMenuOpen
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-2xl text-secondary"
          />
          <img
            onClick={() => setOpen(!open)}
            src={logo}
            alt="logo"
            className={`cursor-pointer h-[40px] duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <Link to="/">
            <h1
              className={`text-secondary cursor-pointer font-bold origin-left text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              AgriPeace
            </h1>
          </Link>
        </div>

        {/* NavLinks */}

        {/* admin role */}
        {role === "admin" && (
          <ul className="pt-6">
            <p
              className={`uppercase ml-3 text-gray-500 mb-3  dark:text-white ${
                !open && "hidden"
              }`}
            >
              <small>Menu</small>
            </p>
            {role === "admin" &&
              adminNavItems.map((menuItem, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={menuItem.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive
                          ? "bg-secondary text-white"
                          : "text-[#413F44] dark:text-white"
                      } duration-150 rounded-md p-2 cursor-pointer hover:scale-105 hover:shadow-md font-bold text-sm items-center gap-x-4`
                    }
                  >
                    {menuItem.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {menuItem.label}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}

        {/* farmer role */}
        {role === "user" && (
          <ul className="pt-6">
            <p
              className={`uppercase ml-3 text-gray-500 mb-3 dark:text-white ${
                !open && "hidden"
              }`}
            >
              <small>Menu</small>
            </p>
            {role === "user" &&
              farmerNavItems.map((menuItem, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={menuItem.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive
                          ? "bg-secondary text-white"
                          : "text-[#413F44] dark:text-white"
                      } duration-150 rounded-md p-2 cursor-pointer hover:scale-105 hover:shadow-md font-bold text-sm items-center gap-x-4`
                    }
                  >
                    {menuItem.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {menuItem.label}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}

        <ul className="pt-6">
          <p
            className={`uppercase ml-3 text-gray-500 mb-3 dark:text-white ${
              !open && "hidden"
            }`}
          >
            <small>Useful links</small>
          </p>
          {lastMenuItems.map((menuItem, index) => (
            <li key={index} className="mb-2">
              <NavLink
                to={menuItem.to}
                className={({ isActive }) =>
                  `flex ${
                    isActive
                      ? "bg-secondary text-white"
                      : "text-[#413F44] dark:text-white"
                  } duration-150 rounded-md p-2 cursor-pointer hover:scale-105 hover:shadow-md font-bold text-sm items-center gap-x-4`
                }
              >
                {menuItem.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menuItem.label}
                </span>
              </NavLink>
            </li>
          ))}

          <li>
            <button
              onClick={handleLogout}
              className={`flex w-full text-[#413F44] duration-150 rounded-md p-2 cursor-pointer hover:shadow-md hover:text-red-500 font-bold text-sm items-center gap-x-4 dark:text-white`}
            >
              <BiLogInCircle className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </button>
          </li>
        </ul>

        {/* User Info Section */}
        {currentUser && (
          <div className="absolute bottom-5 px-2 flex items-center gap-x-4">
            <Link to={`/dashboard/user-profile`}>
              <img
                src={currentUser?.photoUrl}
                alt={currentUser?.name}
                className="w-12 h-12 rounded-full object-cover border-2"
              />
            </Link>
            <div className={`${!open && "hidden"} duration-200`}>
              <p className="text-sm font-bold dark:text-white">
                {currentUser.name}
              </p>
              <p className="text-xs text-gray-400">{currentUser.email}</p>
            </div>
            <div className={`${!open && "hidden"} duration-200`}>
              <ThemeToggle
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            </div>
          </div>
        )}
      </div>

      <div className="h-screen overflow-y-auto px-8 flex-1 dark:bg-gray-900">
        <Scroll />
        <Outlet />
        {/* <div className="absolute top-2 right-4 z-50">
          <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div> */}
      </div>
      <ToastContainer theme={isDarkMode ? "dark" : "light"} />
    </div>
  );
};

export default DashboardLayout;
