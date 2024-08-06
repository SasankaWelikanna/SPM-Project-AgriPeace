import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import ContactUs from "../pages/ContactUs/ContactUs";
import AboutUs from "../pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
   {
     path: "/",
     element: <MainLayout/>,
     children: [
      {
         path: "/",
         element: <Home/>
      },
      {
        path: "/services",
        element: <Services/>
      },
      {
        path: "/contact",
        element: <ContactUs/>
      },
      {
        path: "/aboutUs",
        element: <AboutUs/>
      }
     ]
   },
 ]);