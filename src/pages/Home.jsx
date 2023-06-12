import "../App.css";
import Canvas from "../components/Canvas/Canvas";
import Navbar from "../components/Navbar/Navbar";

import DarkModeContext from "../context/darkmode";
import AlgorithmContext from "../context/selectedAlgorithm";

import { useState, useEffect, useContext } from "react";

function Home() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { algorithm, setAlgorithm } = useContext(AlgorithmContext);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#222831" : "white";
  }, [darkMode]);

  const handleStartClick = () => {
    console.log("clicked start");
  };

  const handleLoadMazeClick = () => {
    console.log("clicked load mazes");
  };

  const handleResetClick = () => {
    console.log("clicked reset");
  };

  return (
    <>
      <Navbar
        current="home"
        handleStartClick={handleStartClick}
        handleLoadMazeClick={handleLoadMazeClick}
        handleResetClick={handleResetClick}
      />
      <div className="container">
        <h1 style={{ color: darkMode ? "white" : "#222831" }}>
          Algorithm Visualizer
        </h1>
        <Canvas
          darkMode={darkMode}
          algorithm={algorithm}
          handleStartClick={handleStartClick}
        />
      </div>
    </>
  );
}

export default Home;
