import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes/router";
import AuthProvider from "./utilities/providers/AuthProvider";
import "aos/dist/aos.css";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 500,
      easing: "ease-in-sine",
    });
  }, []); // Add an empty dependency array to run once on mount

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AuthProvider>
);
