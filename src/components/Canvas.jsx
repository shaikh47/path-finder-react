import { useState } from "react";
import styles from './Canvas.module.css';

function Canvas() {
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
      }} className={`${styles.segment}`} key={i} onClick={() => handlSegmenteClick(i)}></div>);
    }
    return elements;
  };

  return <div className={`${styles.container}`}>{renderSegments()}</div>;
}

export default Canvas;
