import { Menu } from "antd";
import styles from "./Navbar.module.css";
import { useState, useEffect, useContext } from "react";
import Switch from "../../components/switch/Switch";
import { Link } from "react-router-dom";

import DarkModeContext from "../../context/darkmode";
import AlgorithmContext from "../../context/selectedAlgorithm";

const Navbar = ({
  current,
  handleStartClick,
  handleLoadMazeClick,
  handleResetClick,
}) => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { algorithm, setAlgorithm } = useContext(AlgorithmContext);

  const onClick = (e) => {
    console.log("Clicked Item: ", e);
  };

  const onAlgorithmClick = (e) => {
    console.log("selected algo:  ", e.key);
    setAlgorithm(e.key);
  };

  const algoTitle = (
    <p
      style={{
        margin: "0px",
      }}
    >
      <b>Choose Algorithm:</b> {algorithm}
    </p>
  );

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme={darkMode ? "dark" : "light"}
      className="menu"
    >
      <Menu.SubMenu
        key="submenu:1"
        title={algoTitle}
        onClick={onAlgorithmClick}
        style={{
          background: "none",
        }}
      >
        <Menu.Item key={"Dijkstras"}>Dijkstras</Menu.Item>
        <Menu.Item key={"DFS"}>DFS</Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="home">
        <Link to={`/`}>Home</Link>
      </Menu.Item>

      <Menu.Item key="about">
        <Link to={`/about`}>About</Link>
      </Menu.Item>

      <Menu.Item
        className={`${styles.rightElement} ${styles.startButton}`}
        key="start"
        onClick={handleStartClick}
      >
        Start Algo
      </Menu.Item>

      <Menu.Item
        className={`${styles.controlButtons}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        key="load-maze"
        onClick={handleLoadMazeClick}
      >
        Load Maze
      </Menu.Item>

      <Menu.Item
        key="reset"
        className={`${styles.resetButton}`}
        onClick={handleResetClick}
      >
        Reset
      </Menu.Item>

      <Menu.Item
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        disabled
        key="setting:3"
      >
        <Switch value={darkMode} onToggle={toggleDarkMode} />
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
