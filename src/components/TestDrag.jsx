import React, { useState } from "react";

function Grid() {
  const numRows = 10;
  const numCols = 10;
  const [startSegment, setStartSegment] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState("0-0");

  const handleMouseDown = (row, col) => {
    setStartSegment({ row, col });
    setDragging(true);
  };

  const handleMouseUp = (row, col) => {
    if (dragging) {
      // Logic to handle the end of the drag
      setDragging(false);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!dragging || !startSegment) return;

    // Logic to handle dragging while the mouse is moved
    // You can access the start segment position using startSegment.row and startSegment.col
    console.log(
      `Dragging from (${startSegment.row}, ${startSegment.col}) to (${row}, ${col})`
    );
    setStart(`${row}-${col}`)
  };

  const grid = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const segmentStyle = {
        backgroundColor: start === row + "-" + col ? "red" : "#fff",
        width: "30px",
        height: "30px",
        border: "1px solid #ddd",
      };

      const segment = (
        <div
          key={`${row}-${col}`}
          onMouseDown={() => handleMouseDown(row, col)}
          onMouseUp={() => handleMouseUp(row, col)}
          onMouseEnter={() => handleMouseEnter(row, col)}
          style={segmentStyle}
        ></div>
      );
      grid.push(segment);
    }
  }

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${numCols}, 30px)`,
    gridGap: "0px",
    backgroundColor: "#ddd",
  };

  return <div style={gridStyle}>{grid}</div>;
}

export default Grid;
