import { useState } from "react";
import "./App.css";

function App() {
  const [barrier, setBarrier] = useState([]);

  const handlSegmenteClick = (key) => {
    console.log('Clicked item key:', barrier);
    setBarrier((prevBarriers) => [...prevBarriers, key]);
  };

  const renderSegments = () => {
    const elements = [];
    for (let i = 0; i < 336; i++) {
      elements.push(<div style={{
        backgroundColor: barrier.includes(i) ? "red" : ""
      }} className="segment" key={i} onClick={() => handlSegmenteClick(i)}></div>);
    }
    return elements;
  };

  return <div className="container">{renderSegments()}</div>;
}

export default App;
