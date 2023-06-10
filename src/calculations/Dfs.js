import { deleteArrElement, getAdjacent } from "./Utils";

const dfs = (beginning, destination, barriers, maxColumns, maxSegments) => {
  let optimalPath = [];
  const scanned = [beginning];
  const stack = [beginning];

  while (stack.length !== 0) {
    // get the unvisited adjacents of the top most stack element
    let adjacents = getAdjacent(peekStack(stack), maxColumns, maxSegments);

    // remove the barriers from the adjacent list
    adjacents = adjacents.filter((element) => {
      return !barriers.includes(element);
    });
    
    adjacents = adjacents.filter((element) => {
      return !scanned.includes(element);
    });

    // check if all the adjacents are visited
    if (adjacents.length === 0) {
      stack.pop();
    }

    // handle the case where there is not adjacents
    if(scanned.length === maxSegments) break;

    for (const item of adjacents) {
      if (!scanned.includes(item) && !barriers.includes(item)) { // && !barriers.includes(item)
        // push the adjacent to the top of the stack if its unvisited
        stack.push(item);
        scanned.push(item);
        break;
      }
    }
  }

  optimalPath = scanned.slice(0, scanned.indexOf(destination) + 1);
  return { scanned, optimalPath };
};

const arrayContainsAllElements = (arr1, arr2) => {
  for (const item of arr1) {
    if (!arr2.includes(item)) return false;
  }
  return true;
};

const peekStack = (stack) => {
  return stack[stack.length - 1];
};

export { dfs };
