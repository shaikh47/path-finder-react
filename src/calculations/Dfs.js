import { deleteArrElement, getAdjacent } from "./Utils";

const dfs = (beginning, destination, barriers, maxColumns, maxSegments) => {
  let pathTable = [];
  const visitedVertices = [];
  const scanned = [beginning];
  const optimalPath = [];
  const stack = [];

  for (let i = 0; i <= maxSegments; i++) {
    for (const item of getAdjacent(scanned[i], maxColumns, maxSegments)) {
      if (!scanned.includes(item) && item < maxSegments) {
        if (!barriers.includes(item)) {
          scanned.push(item);
          stack.push(item);
          break;
        }
      }
    }
    scanned.push(stack.pop());
  }

  return { scanned, optimalPath };
};

export { dfs };
