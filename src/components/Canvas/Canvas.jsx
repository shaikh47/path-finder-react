import { useRef, useEffect } from "react";
import styles from "./Canvas.module.css";

import { deleteArrElement } from "../../calculations/Utils";
import { algorithmFunction } from "../../calculations/Utils";

import start from "../../assets/start.png";
import finish from "../../assets/finish.png";

const delay = (delayInms) => {
  if (delayInms <= 0) return;
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

function Canvas({
  darkMode,
  algorithm,
  searchedPath,
  optimalPath,
  setBeginning,
  setDestination,
  beginning,
  destination,
  barrier,
  setBarrier,
  colorArr,
  setColorArr,
  row,
  column,
  showSegmentNumbers,
  animationDelay,
  delayPerIteration,
}) {
  const pathColor = darkMode ? "#F9B208" : "#FF7396";
  const searchColor = darkMode ? "#537EC5" : "#98EECC";
  const barrierColor = darkMode ? "#66347F" : "#393053";
  const isClicked = useRef(false);

  // runs the initial animation
  useEffect(() => {
    if (searchedPath.length > 0 && optimalPath.length > 0) {
      const startIteration = async () => {
        for (const [index, item] of searchedPath.entries()) {
          if (item === destination) break;
          if (index % delayPerIteration === 0) await delay(animationDelay); // delay every 5 iteration
          updateColor(item, searchColor);
        }
      };

      const startIterationOptimized = async () => {
        for (const [index, item] of optimalPath.entries()) {
          await delay(animationDelay + 15);
          updateColor(item, pathColor);
        }
      };

      const runEffect = async () => {
        await startIteration();
        startIterationOptimized();
        console.log("completed path optimization");
      };

      runEffect();
    }
  }, [searchedPath, optimalPath]);

  // runs the later renders
  useEffect(() => {
    if (
      searchedPath.length > 0 &&
      optimalPath.length > 0 &&
      beginning !== -1 &&
      destination !== -1
    ) {
      // clear the board first
      setColorArr([]);

      const dijkstrasResult = algorithmFunction(
        algorithm,
        beginning,
        destination,
        barrier,
        row,
        column
      );
      const startIteration = async () => {
        for (const item of dijkstrasResult.scanned) {
          if (item === destination) break;
          updateColor(item, searchColor);
        }
      };

      const startIterationOptimized = async () => {
        for (const item of dijkstrasResult.optimalPath) {
          updateColor(item, pathColor);
        }
      };

      const runEffect = async () => {
        startIteration();
        startIterationOptimized();
        console.log("completed");
      };
      runEffect();
    }
  }, [barrier, beginning, destination, darkMode]);

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
    // handle beginning segment click
    if (key === beginning || beginning === -1) {
      if (beginning === -1) {
        if (barrier.includes(key)) return;
        setBeginning(key);
      } else {
        setBeginning(-1);
      }
      return;
    }

    // handle destination segment click
    if (key === destination || destination === -1) {
      if (destination === -1) {
        if (barrier.includes(key)) return;
        setDestination(key);
      } else {
        setDestination(-1);
      }
      return;
    }

    // handle barrier segment click
    if (barrier.includes(key)) {
      setBarrier([...deleteArrElement(barrier, key)]);
    } else {
      setBarrier((prevBarriers) => {
        if (!prevBarriers.includes(key)) {
          return [...prevBarriers, key];
        }
        return prevBarriers;
      });
    }
  };

  const updateColor = (index, newColor) => {
    setColorArr((prevColorArr) => {
      const updatedArr = [...prevColorArr];
      updatedArr[index] = newColor;
      return updatedArr;
    });
  };

  const handleMouseUp = () => {
    isClicked.current = false;
  };

  const handleMouseDown = () => {
    isClicked.current = true;
  };

  const provideColor = (i) => {
    if (barrier.includes(i)) {
      return barrierColor;
    } else if (beginning === i) {
      return "green";
    } else if (destination === i) {
      return "red";
    } else {
      return colorArr[i];
    }
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
              transition: optimalPath.length > 0 ? "background 0.5s ease" : "",
              background: provideColor(i),
              boxShadow: barrier.includes(i) ? "none" : "",
              outline: barrier.includes(i) ? "1px solid" : "",
            }}
            className={`
              ${styles.segment} 
              ${darkMode ? styles.segmentDarkMode : ""} 
              ${beginning === -1 ? styles.segmentSetBeginning : ""}
              ${destination === -1 ? styles.segmentSetDestination : ""}
            `}
            key={i}
            onMouseEnter={() => handlSegmentDrag(i)}
            onMouseUp={() => handleMouseUp()}
            onMouseDown={() => handleMouseDown()}
            onClick={() => handlSegmenteClick(i)}
          >
            {showSegmentNumbers ? (
              <p style={{ fontSize: "10px", userSelect: "none" }}>{i}</p>
            ) : (
              <></>
            )}

            {destination === i ? <img src={finish} alt="finish" /> : ""}
            {beginning === i ? <img src={start} alt="start" /> : ""}
          </div>
        );
      }
      elements.push(
        <div key={k} style={{ display: "flex" }}>
          {...rowElements}
        </div>
      );
    }
    return elements;
  };

  return <div className={`${styles.container}`}>{renderSegments()}</div>;
}

export default Canvas;
