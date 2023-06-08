import "./App.css";
import Canvas from "./components/Canvas";
import Test from "./components/TestDrag";

import Switch from "./components/switch/Switch";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
const { SubMenu } = Menu;
import { useState } from "react";

const CustomSubMenu = () => {
  return (
    <SubMenu title="Dropdown Menu" icon={<DownOutlined />}>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
    </SubMenu>
  );
};

function App() {
  const [current, setCurrent] = useState("mail");
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
        theme="dark"
      >
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        
        <Menu.SubMenu  title="Choose Algorithm">
          <Menu.Item>Dijkstras</Menu.Item>
          <Menu.Item>A*</Menu.Item>
          <Menu.Item>BFS</Menu.Item>
          <Menu.Item>DFS</Menu.Item>
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
          key="setting:4"
        >
          <Switch />
        </Menu.Item>
      </Menu>
      <div className="container">
        <h1>Dijkstras</h1>
        <Canvas />
        {/* <Test /> */}
      </div>
    </>
  );
}

export default App;
