import { useState, useRef, useEffect } from "react";
import styles from "./Canvas.module.css";
import { dijkstras } from "../calculations/Dijkstras";

const animationDelay = 1;
const traverseTillDestinaton = true;
const segmentDimension = 30;
const showSegmentNumbers = false;
const row = Math.floor(window.innerHeight / segmentDimension) - 7;
const column = Math.floor(window.innerWidth / segmentDimension) - 2;

const presetMaze1 = [
  63, 64, 62, 65, 66, 67, 129, 191, 253, 315, 377, 439, 501, 563, 625, 624, 686,
  748, 810, 872, 934, 996, 1058, 1120, 1182, 1244, 1184, 1122, 1060, 998, 936,
  1246, 812, 750, 689, 627, 565, 503, 441, 379, 317, 255, 193, 131, 69, 70, 71,
  72, 73, 135, 197, 259, 321, 383, 445, 507, 569, 631, 693, 755, 817, 262, 200,
  138, 76, 14, 324, 386, 448, 510, 572, 634, 696, 758, 820, 882, 944, 1006,
  1068, 1130, 814, 815, 816, 813, 938, 939, 940, 937, 941, 11, 1065, 1127, 1189,
  1251, 1003, 1193, 1194, 1195, 1192, 1196, 1197, 1198, 1199, 1200, 1201, 1202,
  1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 1214, 1215,
  1216, 1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1164, 1102,
  1101, 1099, 1098, 1100, 1097, 1096, 1095, 1094, 1092, 1091, 1090, 1089, 1088,
  1087, 1086, 1085, 1084, 1083, 1082, 1081, 1080, 1079, 1078, 1077, 1076, 1075,
  1074, 1073, 1072, 1071, 1070, 1093, 1069, 16, 140, 202, 264, 326, 388, 450,
  512, 574, 636, 698, 760, 822, 884, 946, 947, 948, 949, 950, 951, 952, 953,
  954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968,
  969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 1042, 1104, 1166,
  1228, 1290, 142, 143, 144, 145, 146, 141, 270, 332, 208, 331, 330, 329, 328,
  327, 204, 265, 203, 267, 268, 266, 206, 205, 207, 269, 18, 19, 20, 17, 21, 22,
  23, 24, 86, 148, 210, 272, 334, 396, 458, 457, 456, 455, 454, 453, 452, 514,
  576, 638, 700, 762, 824, 825, 826, 827, 828, 829, 830, 768, 706, 644, 582,
  520, 519, 518, 517, 516, 515, 578, 577, 639, 701, 640, 579, 702, 641, 581,
  580, 764, 763, 704, 766, 765, 705, 643, 642, 703, 767, 832, 770, 894, 708,
  646, 584, 522, 460, 398, 336, 274, 212, 150, 88, 89, 90, 91, 153, 215, 277,
  339, 401, 463, 525, 587, 649, 711, 773, 835, 897, 896, 895, 833, 771, 709,
  647, 585, 523, 461, 399, 337, 275, 213, 151, 152, 214, 276, 338, 400, 462,
  524, 586, 648, 710, 772, 834, 93, 155, 217, 279, 31, 341, 403, 465, 527, 589,
  651, 713, 775, 837, 838, 839, 840, 778, 716, 654, 592, 530, 468, 406, 344,
  282, 220, 158, 96, 34, 33, 32, 94, 156, 218, 280, 342, 404, 466, 528, 590,
  652, 714, 776, 777, 715, 157, 95, 219, 281, 343, 405, 467, 529, 591, 653, 845,
  783, 721, 659, 907, 597, 535, 473, 411, 349, 225, 287, 163, 164, 165, 166,
  167, 229, 291, 353, 415, 477, 539, 601, 663, 725, 787, 849, 911, 910, 909,
  908, 846, 784, 722, 660, 598, 536, 474, 599, 661, 723, 785, 847, 848, 786,
  724, 662, 600, 538, 476, 414, 352, 290, 289, 227, 226, 288, 350, 412, 475,
  537, 413, 351, 228, 108, 170, 232, 46, 356, 418, 480, 294, 542, 604, 666, 728,
  790, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 799, 737, 675, 613,
  489, 365, 303, 427, 241, 179, 55, 981, 982, 983, 984, 985, 986, 987, 925, 863,
  801, 739, 677, 615, 553, 491, 490, 181, 243, 305, 367, 429, 366, 428, 304,
  242, 180, 57, 58, 56, 59, 61, 60, 1177, 1176, 1175, 1173, 1174, 1172, 1171,
  1170, 1169, 1168, 250, 189, 127, 251, 313, 374, 436, 498, 560, 622, 499, 375,
  437, 561, 623, 685, 747, 809, 808, 870, 932, 994, 1056, 1118, 1241, 1179,
  1180, 1242, 1243, 1181, 1119, 1057, 995, 933, 871, 684, 746, 1055, 1117, 1178,
  1240, 1116, 1054, 992, 930, 931, 869, 807, 745, 683, 682, 620, 558, 496, 744,
  806, 868, 993, 621, 559, 497, 435, 373, 311, 249, 187, 188, 312, 126, 125,
  124, 186, 248, 310, 372, 434,
];

const delay = (delayInms) => {
  if (delayInms <= 0) return;
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

function Canvas({ darkMode }) {
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
            darkMode
              ? "radial-gradient(circle, #576CBC 0%, #19376D 100%)"
              : "radial-gradient(circle, #19A7CE 0%, #B0DAFF 100%)"
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
            darkMode
              ? "radial-gradient(circle, #576CBC 0%, #19376D 100%)"
              : "radial-gradient(circle, #19A7CE 0%, #B0DAFF 100%)"
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
                ? darkMode
                  ? "#66347F"
                  : "#526D82"
                : beginning === i
                ? "green"
                : destination === i
                ? "red"
                : currentSegment === i
                ? colorArr[i]
                : colorArr[i],
            }}
            className={`${styles.segment} ${
              darkMode ? styles.segmentDarkMode : ""
            }`}
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
        <button
          className={`${styles.buttons} ${
            darkMode ? styles.buttonsDarkMode : ""
          }`}
        >
          Add Beginning
        </button>
        <button
          className={`${styles.buttons} ${
            darkMode ? styles.buttonsDarkMode : ""
          }`}
          onClick={() => {
            setBarrier(presetMaze1);
          }}
        >
          Load Maze
        </button>

        <button
          className={`${styles.buttons} ${
            darkMode ? styles.buttonsDarkMode : ""
          }`}
          onClick={() => {
            const updatedBarrier = [...barrier];
            updatedBarrier.pop();
            setBarrier(updatedBarrier);
          }}
        >
          Remove Barrier
        </button>
        <button
          className={`${styles.buttons} ${styles.startButton} ${
            darkMode ? styles.buttonsDarkMode : ""
          }`}
          onClick={handleStartAlgoClick}
        >
          Start Algo
        </button>

        <button
          className={`${styles.buttons} ${styles.resetButton} ${
            darkMode ? styles.buttonsDarkMode : ""
          }`}
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
