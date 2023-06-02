import { useState, useRef, useEffect } from "react";
import styles from "./Canvas.module.css";
import { calculate, dijkstras } from "../calculations/Dijkstras";

const divColors = [
  "#5f6ce1",
  "#2bdd13",
  "#0ee2d1",
  // Add more colors here
];

function Canvas() {
  const [barrier, setBarrier] = useState([]);
  const isClicked = useRef(false);

  const [beginning, setBeginning] = useState(140);
  const [destination, setDestination] = useState(167);

  const [currentSegment, setCurrentSegment] = useState(0);
  const [color, setColor] = useState(2);

  const [colorArr, setColorArr] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSegment((prevIndex) => (prevIndex + 1) % 336);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (colorArr.length !== 0) return;
    const tempArr = [];
    for (let i = 0; i < 336; i++) {
      tempArr.push("white");
    }
    setColorArr(tempArr);
    console.log(colorArr);
  }, []);

  useEffect(() => {
    console.log(colorArr);
    console.log(dijkstras(140, -1, -1, 28, 336));
    
  }, [colorArr]);

  const handlSegmentDrag = (key) => {
    if (key === beginning || key === destination) return;
    if (!isClicked.current) return;
    setBarrier((prevBarriers) => {
      if (!prevBarriers.includes(key)) {
        return [...prevBarriers, key];
      }
      return prevBarriers;
    });
  };

  const handlSegmenteClick = (key) => {
    console.log(calculate(key, beginning, destination, barrier, 28, 335));

    // change the side segment colors

    if (key === beginning || key === destination) return;

    console.log("Clicked item key:", barrier);
    setBarrier((prevBarriers) => {
      if (!prevBarriers.includes(key)) {
        return [...prevBarriers, key];
      }
      return prevBarriers;
    });
  };

  const updateColor = (index, newColor) => {
    setColorArr((prevColorArr) => {
      const updatedArr = [...prevColorArr];
      updatedArr[index] = newColor;
      return updatedArr;
    });
  };

  const handleBeginningClick = (key) => {};

  const handleDestinationClick = (key) => {};

  const handleMouseUp = () => {
    isClicked.current = false;
  };

  const handleMouseDown = () => {
    isClicked.current = true;
  };

  const renderSegments = () => {
    const elements = [];
    for (let i = 0; i < 336; i++) {
      elements.push(
        <div
          style={{
            // backgroundColor: (beginning===i ? (destination===i?"blue":"") : ""),
            backgroundColor: barrier.includes(i)
              ? "red"
              : beginning === i
              ? "green"
              : destination === i
              ? "yellow"
              : currentSegment === i
              ? divColors[color]
              : colorArr[i]

            // backgroundColor: colorArr[i],
          }}
          className={`${styles.segment}`}
          key={i}
          onMouseEnter={() => handlSegmentDrag(i)}
          onMouseUp={() => handleMouseUp(i)}
          onMouseDown={() => handleMouseDown(i)}
          onClick={() => handlSegmenteClick(i)}
        >
          <p>{i}</p>
        </div>
      );
    }
    return elements;
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.canvasContainer}`}>{renderSegments()}</div>
      <div className={`${styles.buttonContainer}`}>
        <button className={`${styles.buttons}`}>Add Beginning</button>
        <button className={`${styles.buttons}`}>Add Destination</button>
      </div>
    </div>
  );
}

export default Canvas;
