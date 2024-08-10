import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import ContactUs from "../pages/ContactUs/ContactUs";
import AboutUs from "../pages/AboutUs/AboutUs";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import FarmerHome from "../pages/Dashboard/Farmer/FarmerHome";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import UpdateUser from "../pages/Dashboard/Admin/UpdateUser";
import PlantManagement from "../pages/Dashboard/Admin/PlantManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      // farmer routes
      {
        path: "farmer-home",
        element: <FarmerHome />,
      },

      // admin routes
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "update-user/:id",
        element: <UpdateUser />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/users/${params.id}`),
      },

      //plant management
      {
        path: "manage-plant",
        element: <PlantManagement />,
      },
    ],
  },
]);
