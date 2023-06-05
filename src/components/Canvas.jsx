import { useState, useRef, useEffect } from "react";
import styles from "./Canvas.module.css";
import { dijkstras } from "../calculations/Dijkstras";

const animationDelay = 1;
const totalSegments = 918;
const totalColumn = 51;
const traverseTillDestinaton = true;

const delay = (delayInms) => {
  if(delayInms<=0) return; 
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

function Canvas() {
  const [barrier, setBarrier] = useState([]);
  const isClicked = useRef(false);

  const [beginning, setBeginning] = useState(459);
  const [destination, setDestination] = useState(597);

  const [currentSegment, setCurrentSegment] = useState(0);

  const [colorArr, setColorArr] = useState([]);

  const [dijkstrasPath, setDijkstrasPath] = useState([]);
  const [dijkstrasOptimalPath, setDijkstrasOptimalPath] = useState([]);

  const handleStartAlgoClick = () => {
    const dijkstrasResult = dijkstras(beginning, destination, barrier, totalColumn, totalSegments);
    setDijkstrasPath(dijkstrasResult.scanned);
    setDijkstrasOptimalPath(dijkstrasResult.optimalPath);
  };

  useEffect(() => {
    if (dijkstrasPath.length > 0 && dijkstrasOptimalPath.length > 0) {
      const startIteration = async () => {
        for (const item of dijkstrasPath) {
          if(item === destination && traverseTillDestinaton) break;
          await delay(animationDelay);
          updateColor(
            item,
            "radial-gradient(circle, #708cff 0%, #082cc2 100%)"
          );
        }
      };

      const startIterationOptimized = async () => {
        for (const item of dijkstrasOptimalPath) {
          await delay(animationDelay + 30);
          updateColor(item, "#57ffc4");
        }
      };

      const runEffect = async () => {
        await startIteration();
        await startIterationOptimized();
        console.log("completed");
      };
      runEffect();
    }
  }, [dijkstrasPath, dijkstrasOptimalPath]);

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
    for (let i = 0; i < totalSegments; i++) {
      elements.push(
        <div
          style={{
            background: barrier.includes(i)
              ? "#606060"
              : beginning === i
              ? "green"
              : destination === i
              ? "red"
              : currentSegment === i
              ? colorArr[i]
              : colorArr[i],
          }}
          className={`${styles.segment}`}
          key={i}
          onMouseEnter={() => handlSegmentDrag(i)}
          onMouseUp={() => handleMouseUp(i)}
          onMouseDown={() => handleMouseDown(i)}
          onClick={() => handlSegmenteClick(i)}
        >
          {/* <p style={{ fontSize: "9px"}}>{i}</p> */}
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
        <button className={`${styles.buttons}`} onClick={() => {}}>
          Add Destination
        </button>
        <button
          className={`${styles.buttons}`}
          onClick={() => {
            const updatedBarrier = [...barrier];
            updatedBarrier.pop();
            setBarrier(updatedBarrier);
          }}
        >
          Remove Barrier
        </button>
        <button className={`${styles.buttons}`} onClick={handleStartAlgoClick}>
          Start Algo
        </button>
      </div>
    </div>
  );
}

export default Canvas;
