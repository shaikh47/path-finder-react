import "./App.css";
import Canvas from "./components/Canvas";
import Test from "./components/TestDrag";
import Navbar from "./components/Navbar/Navbar";

import DarkModeContext from "./context/darkmode";
import AlgorithmContext from "./context/selectedAlgorithm"

import { useState, useEffect, useContext } from "react";

function App() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { algorithm, setAlgorithm } = useContext(AlgorithmContext);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#222831" : "white";
  }, [darkMode]);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 style={{ color: darkMode ? "white" : "#222831" }}>Algorithm Visualizer</h1>
        <Canvas darkMode={darkMode} algorithm={algorithm}/>
        {/* <Test /> */}
      </div>
    </>
  );
}

export default App;
