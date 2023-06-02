export const calculate = (
  segmentNumber,
  beginning,
  destination,
  barriers,
  maxColumns,
  maxSegments
) => {
  return getAdjacent(segmentNumber, maxColumns, maxSegments);
};

function toFindDuplicates(arry) {
  const uniqueElements = new Set(arry);
  const filteredElements = arry.filter(item => {
      if (uniqueElements.has(item)) {
          uniqueElements.delete(item);
      } else {
          return item;
      }
  });

  return [...new Set(uniqueElements)]
}

export const dijkstras = (
  beginning,
  destination,
  barriers,
  maxColumns,
  maxSegments
) => {
  const visitedVertices = [];
  const unvisitedVertices = [];

  const scanned = [beginning];

  for(let i=0;i<=2;i++) {
    getAdjacent(scanned[i], maxColumns, maxSegments).forEach((item, index)=> {
      if(!scanned.includes(item)) {
        scanned.push(item);
      }
    });
  }

  return scanned;
  return scanned.sort(function(a, b){return a - b});
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
      resultArr.push(topLeftCornerSegment);
    }
    if (result.lowerSegment !== undefined) {
      result.bottomLeftCornerSegment = bottomLeftCornerSegment;
      resultArr.push(bottomLeftCornerSegment);
    }
  }
  if (rightSegment % maxColumns !== 0) {
    result.rightSegment = rightSegment;
    resultArr.push(rightSegment);

    if (result.upperSegment !== undefined) {
      result.topRightCornerSegment = topRightCornerSegment;
      resultArr.push(topRightCornerSegment);
    }
    if (result.lowerSegment !== undefined) {
      result.bottomRightCornerSegment = bottomRightCornerSegment;
      resultArr.push(bottomRightCornerSegment);
    }
  }

  return resultArr;
};
