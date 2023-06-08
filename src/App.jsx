import "./App.css";
import Canvas from "./components/Canvas";
import Test from "./components/TestDrag";

import Switch from "./components/switch/Switch";

import { Menu } from "antd";
import { useState, useEffect } from "react";

function App() {
  const [current, setCurrent] = useState("mail");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#222831" : "white";
  }, [darkMode]);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        theme={darkMode ? "dark" : "light"}
      >
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
        <Menu.Item key="setting:3">Option 3</Menu.Item>

        <Menu.SubMenu key="submenu:1" title="Choose Algorithm">
          <Menu.Item key={1}>Dijkstras</Menu.Item>
          <Menu.Item key={2}>A*</Menu.Item>
          <Menu.Item key={3}>BFS</Menu.Item>
          <Menu.Item key={4}>DFS</Menu.Item>
        </Menu.SubMenu>

        <Menu.Item key="setting:4">Option 4</Menu.Item>
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
          <Switch value={darkMode} onToggle={setDarkMode} />
        </Menu.Item>
      </Menu>
      <div className="container">
        <h1 style={{ color: darkMode ? "white" : "#222831" }}>Dijkstras</h1>
        <Canvas darkMode={darkMode} />
        {/* <Test /> */}
      </div>
    </>
  );
}

export default App;
