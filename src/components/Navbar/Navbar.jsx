import { Menu } from "antd";
import { useState, useEffect, useContext } from "react";
import Switch from "../../components/switch/Switch";

import DarkModeContext from "../../context/darkmode";
import AlgorithmContext from "../../context/selectedAlgorithm"

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { algorithm, setAlgorithm } = useContext(AlgorithmContext);

  const [current, setCurrent] = useState("mail");
  // const [algorithm, setAlgorithm] = useState("Dijkstras");

  const onClick = (e) => {
    console.log("clicked ", e);
    // setCurrent(e.key);
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
      >
        <Menu.Item key={"Dijkstras"}>Dijkstras</Menu.Item>
        <Menu.Item key={"DFS"}>DFS</Menu.Item>
      </Menu.SubMenu>

      <Menu.Item
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
        }}
        disabled
        key="setting:5"
      >
        <Switch value={darkMode} onToggle={toggleDarkMode} />
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
