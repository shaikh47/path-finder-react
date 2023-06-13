import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { Provider } from "./context/darkmode.jsx";
import { AlgorithmProvider } from "./context/selectedAlgorithm.jsx";

import Home from "./pages/Home";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AlgorithmProvider>
    <Provider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </AlgorithmProvider>
);
