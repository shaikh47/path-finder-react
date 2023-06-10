const randomObstacleGenerator = (beginning, destination, maxSegments, mazePercent) => {
  const barriers = [];
  console.log("total : ", maxSegments, "mazes : ", (maxSegments * (mazePercent / 100)));
  while (barriers.length < (maxSegments * (mazePercent / 100))) {
    // generate random number
    while (true) {
      const obstacle = Math.floor(Math.random() * maxSegments);
      if (
        !barriers.includes(obstacle) &&
        obstacle !== beginning &&
        obstacle !== destination
      ) {
        barriers.push(obstacle);
        break;
      }
    }
  }
  return barriers;
};

export { randomObstacleGenerator };
