import { useState, useRef, useEffect } from "react";
import styles from "./Canvas.module.css";
import { dijkstras } from "../calculations/Dijkstras";

const animationDelay = 1;
const traverseTillDestinaton = true;
const segmentDimension = 30;
const showSegmentNumbers = false;
const row = Math.floor(window.innerHeight / segmentDimension) - 7;
const column = Math.floor(window.innerWidth / segmentDimension) - 2;

const delay = (delayInms) => {
  if (delayInms <= 0) return;
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

function Canvas() {
  const [barrier, setBarrier] = useState([]);
  const isClicked = useRef(false);

  const [beginning, setBeginning] = useState(0);
  const [destination, setDestination] = useState(row * column - 1);

  const [currentSegment, setCurrentSegment] = useState(0);

  const [colorArr, setColorArr] = useState([]);

  const [dijkstrasPath, setDijkstrasPath] = useState([]);
  const [dijkstrasOptimalPath, setDijkstrasOptimalPath] = useState([]);

  const handleStartAlgoClick = () => {
    const dijkstrasResult = dijkstras(
      beginning,
      destination,
      barrier,
      column,
      row * column
    );
    setDijkstrasPath(dijkstrasResult.scanned);
    setDijkstrasOptimalPath(dijkstrasResult.optimalPath);
  };

  useEffect(() => {
    if (dijkstrasPath.length > 0 && dijkstrasOptimalPath.length > 0) {
      const startIteration = async () => {
        for (const item of dijkstrasPath) {
          if (item === destination && traverseTillDestinaton) break;
          await delay(animationDelay);
          updateColor(
            item,
            "radial-gradient(circle, #576CBC 0%, #19376D 100%)"
          );
        }
      };

      const startIterationOptimized = async () => {
        for (const item of dijkstrasOptimalPath) {
          await delay(animationDelay + 30);
          updateColor(item, "#00DFA2");
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

  useEffect(() => {
    if (dijkstrasPath.length > 0 && dijkstrasOptimalPath.length > 0) {
      const dijkstrasResult = dijkstras(
        beginning,
        destination,
        barrier,
        column,
        row * column
      );
      const startIteration = async () => {
        for (const item of dijkstrasResult.scanned) {
          if (item === destination && traverseTillDestinaton) break;
          updateColor(
            item,
            "radial-gradient(circle, #576CBC 0%, #19376D 100%)"
          );
        }
      };

      const startIterationOptimized = async () => {
        for (const item of dijkstrasResult.optimalPath) {
          updateColor(item, "#00DFA2");
        }
      };

      const runEffect = async () => {
        startIteration();
        startIterationOptimized();
        console.log("completed");
      };
      runEffect();
    }
  }, [barrier, beginning, destination]);

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
    let elements = [];
    let rowElements = [];
    for (let k = 0; k < row; k++) {
      rowElements = [];
      for (let i = column * k; i < column * (k + 1); i++) {
        rowElements.push(
          <div
            style={{
              background: barrier.includes(i)
                ? "#66347F"
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
            {showSegmentNumbers ? (
              <p style={{ fontSize: "10px", userSelect: "none" }}>{i}</p>
            ) : (
              <></>
            )}
          </div>
        );
      }
      elements.push(
        <div key={k} style={{ display: "flex" }}>
          {" "}
          {...rowElements}
        </div>
      );
    }
    return elements;
  };

  return (
    <div className={`${styles.container}`}>
      {/* <div className={`${styles.canvasContainer}`}>{renderSegments()}</div> */}
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
        <button
          className={`${styles.buttons} ${styles.startButton}`}
          onClick={handleStartAlgoClick}
        >
          Start Algo
        </button>

        <button
          className={`${styles.buttons} ${styles.resetButton}`}
          onClick={() => {
            setDijkstrasPath([]);
            setBarrier([]);
            setDijkstrasOptimalPath([]);
            setColorArr([]);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Canvas;
