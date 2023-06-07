import "./App.css";
import Canvas from "./components/Canvas";
import Test from "./components/TestDrag";

import Switch from "./components/switch/Switch";

function App() {
  return (
    <div className="container">
      <h1>Dijkstras</h1>
      {/* <Switch /> */}
      <Canvas />
      {/* <Test /> */}
    </div>
  );
}

export default App;
