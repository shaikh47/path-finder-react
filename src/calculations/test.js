const myArr = [
  { vertex: "140", shortestDistanceFromBeginning: 0, previousVertex: null },
  {
    vertex: "23",
    shortestDistanceFromBeginning: Infinity,
    previousVertex: null,
  },
];

const findArrElement = (arr, target) => {
  return arr.find((element) => {
    return element.vertex == target;
  });
};

console.log(findArrElement(myArr, 140));

const modifyArray = (arr, vertex, newDistance, newPreviousVertex) => {
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
  
  // Usage examples
//   const updatedArrWithDistance = modifyArray(myArr, "233", 100, "A");
//   console.log(updatedArrWithDistance);
  