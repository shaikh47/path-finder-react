import { deleteArrElement, getAdjacent } from "./Utils";

const dfs = (beginning, destination, barriers, maxColumns, maxSegments) => {
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
};
