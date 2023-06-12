import { dijkstras } from "../calculations/Dijkstras";
import { dfs } from "../calculations/Dfs";

const deleteArrElement = (arr, element) => {
  const index = arr.indexOf(element);
  const deleted = arr.splice(index, 1);
  return arr;
};

const getAdjacent = (segmentNumber, maxColumns, maxSegments) => {
  const result = {};
  const resultArr = [];

  const upperSegment = segmentNumber - maxColumns;
  const lowerSegment = segmentNumber + maxColumns;

  const leftSegment = segmentNumber - 1;
  const rightSegment = segmentNumber + 1;

  const topLeftCornerSegment = upperSegment - 1;
  const topRightCornerSegment = upperSegment + 1;
  const bottomLeftCornerSegment = lowerSegment - 1;
  const bottomRightCornerSegment = lowerSegment + 1;

  if (upperSegment >= 0) {
    result.upperSegment = upperSegment;
    resultArr.push(upperSegment);
  }
  if (lowerSegment <= maxSegments) {
    result.lowerSegment = lowerSegment;
    resultArr.push(lowerSegment);
  }
  if (segmentNumber % maxColumns !== 0) {
    result.leftSegment = leftSegment;
    resultArr.push(leftSegment);

    if (result.upperSegment !== undefined) {
      result.topLeftCornerSegment = topLeftCornerSegment;
      // resultArr.push(topLeftCornerSegment);
    }
    if (result.lowerSegment !== undefined) {
      result.bottomLeftCornerSegment = bottomLeftCornerSegment;
      // resultArr.push(bottomLeftCornerSegment);
    }
  }
  if (rightSegment % maxColumns !== 0) {
    result.rightSegment = rightSegment;
    resultArr.push(rightSegment);

    if (result.upperSegment !== undefined) {
      result.topRightCornerSegment = topRightCornerSegment;
      // resultArr.push(topRightCornerSegment);
    }
    if (result.lowerSegment !== undefined) {
      result.bottomRightCornerSegment = bottomRightCornerSegment;
      // resultArr.push(bottomRightCornerSegment);
    }
  }
  return resultArr;
};

const algorithmFunction = (
  algo,
  beginning,
  destination,
  barrier,
  row,
  column
) => {
  if (algo === "Dijkstras") {
    return dijkstras(beginning, destination, barrier, column, row * column);
  } else if (algo === "DFS") {
    return dfs(beginning, destination, barrier, column, row * column);
  }
};

export { deleteArrElement, getAdjacent, algorithmFunction };
