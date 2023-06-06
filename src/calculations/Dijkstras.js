// considering neghbor edge weights as constant 1
const constantEdgeWeight = 1;

export const dijkstras = (
  beginning,
  destination,
  barriers,
  maxColumns,
  maxSegments
) => {
  let pathTable = [];
  const visitedVertices = [];
  const scanned = [beginning];

  for (let i = 0; i <= maxSegments; i++) {
    getAdjacent(scanned[i], maxColumns, maxSegments).forEach((item, index) => {
      if (!scanned.includes(item) && item < maxSegments) {
        if (!barriers.includes(item)) scanned.push(item);
      }
    });
  }

  let unvisitedVertices = Array.from(scanned);
  const pathBeginning = {
    vertex: beginning,
    shortestDistanceFromBeginning: 0,
    previousVertex: null,
  };
  pathTable.push(pathBeginning);

  // prepare the rest of the table
  for (let i = 0; i < maxSegments; i++) {
    if (i === beginning) continue;
    const tempPath = {
      vertex: i,
      shortestDistanceFromBeginning: Infinity,
      previousVertex: null,
    };
    pathTable.push(tempPath);
  }

  while (unvisitedVertices.length !== 0) {
    // get the vertex with the shortest distance in the table and it must be in the unvisited list of vertices
    const smallestDist = getSmallestPath(pathTable, unvisitedVertices);
    // console.log("Smallest existing path: ", smallestDist)

    // break as the unvisitedVertices list is empty
    if (smallestDist === null) break;

    // get the adjacent unvisited vertices
    const adjacent = getAdjacent(smallestDist.vertex, maxColumns, maxSegments);

    const unvisitedAdjacent = adjacent.filter((currentValue) => {
      return unvisitedVertices.includes(currentValue);
    });

    // prepare the edge table for the adjacent nodes
    unvisitedAdjacent.forEach((item, index) => {
      // get distance from 'smallestDist' with all neighbors 'unvisitedAdjacent'
      let weight;
      if (barriers.includes(item)) {
        weight = Infinity;
      } else {
        weight = constantEdgeWeight;
      }
      const distance =
        findArrElement(pathTable, smallestDist.vertex)
          .shortestDistanceFromBeginning + weight;
      if (
        distance < findArrElement(pathTable, item).shortestDistanceFromBeginning
      ) {
        // replace the wight and the previousVertex in the table
        pathTable = modifyArrayByVertex(pathTable, item, distance, smallestDist.vertex);
      }
    });

    // remove the current vertex from the unvisited vertices array
    unvisitedVertices = deleteArrElement(
      unvisitedVertices,
      smallestDist.vertex
    );

    // add it to the visited vertices list
    visitedVertices.push(smallestDist);
  }

  const optimalPath = constructPath(
    pathTable,
    beginning,
    destination
  ).reverse();
  return { scanned, optimalPath };
};

const modifyArrayByVertex = (arr, vertex, newDistance, newPreviousVertex) => {
  const modifiedArray = arr.map((element) => {
    if (element.vertex === vertex) {
      return {
        ...element,
        shortestDistanceFromBeginning: newDistance,
        previousVertex: newPreviousVertex,
      };
    } else {
      return element;
    }
  });

  return modifiedArray;
};

const findArrElement = (arr, target) => {
  return arr.find((element) => {
    return element.vertex == target;
  });
};

const getSmallestPath = (pathTable, unvisitedVertices) => {
  const availablePaths = pathTable.filter((path) =>
    unvisitedVertices.includes(path.vertex)
  );

  if (availablePaths.length === 0) {
    return null;
  }

  const smallestPath = availablePaths.reduce((smallest, current) => {
    if (
      current.shortestDistanceFromBeginning <
      smallest.shortestDistanceFromBeginning
    ) {
      return current;
    } else {
      return smallest;
    }
  }, availablePaths[0]);

  return smallestPath;
};

const deleteArrElement = (arr, element) => {
  const index = arr.indexOf(element);
  const x = arr.splice(index, 1);
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

const constructPath = (pathTable, beginning, destination) => {
  let segment = findArrElement(pathTable, destination);
  const fullPath = [];

  fullPath.push(destination);

  while (segment.vertex !== beginning) {
    destination = segment.previousVertex;
    segment = findArrElement(pathTable, destination);
    fullPath.push(segment.vertex);
  }
  return fullPath;
};
