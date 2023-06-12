import "./Home.css";
import Canvas from "../components/Canvas/Canvas";
import Navbar from "../components/Navbar/Navbar";

import DarkModeContext from "../context/darkmode";
import AlgorithmContext from "../context/selectedAlgorithm";
import { randomObstacleGenerator } from "../calculations/GenerateMaze";
import { algorithmFunction } from "../calculations/Utils";
import { useState, useEffect, useContext } from "react";

const segmentDimension = 30;
const showSegmentNumbers = false;
const row = Math.floor(window.innerHeight / segmentDimension) - 5;
const column = Math.floor(window.innerWidth / segmentDimension) - 2;
const mazePercentaze = 30;
const animationDelay = 1;
const delayPerIteration = 5;

function Home() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { algorithm, setAlgorithm } = useContext(AlgorithmContext);

  const [searchedPath, setSearchedPath] = useState([]);
  const [optimalPath, setOptimalPath] = useState([]);
  const [beginning, setBeginning] = useState(0);
  const [destination, setDestination] = useState(row * column - 1);
  const [barrier, setBarrier] = useState([]);
  const [colorArr, setColorArr] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#222831" : "white";
  }, [darkMode]);

  const handleStartClick = () => {
    console.log("clicked start");

    const dijkstrasResult = algorithmFunction(
      algorithm,
      beginning,
      destination,
      barrier,
      row,
      column
    );
    setSearchedPath(dijkstrasResult.scanned);
    setOptimalPath(dijkstrasResult.optimalPath);
    return dijkstrasResult;
  };

  const handleLoadMazeClick = () => {
    console.log("clicked load mazes");

    const mazes = randomObstacleGenerator(
      beginning,
      destination,
      row * column,
      mazePercentaze
    );
    setBarrier(mazes);
  };

  const handleResetClick = () => {
    console.log("clicked reset");

    // reset the path on the first click, then reset the obstacles on the second click
    if (searchedPath.length !== 0 || optimalPath.length !== 0) {
      setSearchedPath([]);
      setOptimalPath([]);
    } else {
      setBarrier([]);
    }
    setColorArr([]);
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
          searchedPath={searchedPath}
          optimalPath={optimalPath}
          setBeginning={setBeginning}
          setDestination={setDestination}
          beginning={beginning}
          destination={destination}
          barrier={barrier}
          setBarrier={setBarrier}
          colorArr={colorArr}
          setColorArr={setColorArr}
          row={row}
          column={column}
          showSegmentNumbers={showSegmentNumbers}
          animationDelay={animationDelay}
          delayPerIteration={delayPerIteration}
        />
      </div>
    </>
  );
}

export default Home;
