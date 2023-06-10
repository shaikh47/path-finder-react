import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "./context/darkmode.jsx";
import { AlgorithmProvider } from "./context/selectedAlgorithm.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AlgorithmProvider>
    <Provider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </AlgorithmProvider>
);
