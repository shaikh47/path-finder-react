# Path Finder Algorithm Visualizer


This project is a web-based visualizer for pathfinding algorithms. It allows you to see how different pathfinding algorithms work in real-time on a grid. You can interactively place obstacles, start and end points, and visualize how the algorithms find the shortest path.

Check out the live site: [Path Finder Algorithm Visualizer](https://react-path-finder.netlify.app/)

## Features

- Interactive grid-based visualization of pathfinding algorithms.
- Two algorithms to choose from, including Dijkstra's algorithm, and Depth First Search.
- Start and end point placement for finding paths between different locations.
- Random maze generation 
- Interactive obstacle placement to simulate real-world scenarios.
- Real-time visualization updates as the algorithm searches for the shortest path.
- Clearing the grid to start a new visualization.
- Implemented togglable darkmode option

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository: `git clone git@github.com:shaikh47/path-finder-react.git`
2. Navigate to the project directory: `cd path-finder-react`
3. Install the dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and visit: `http://localhost:5173`

## Usage

- Click or drag on the grid cells to place obstacles or move the start/end points.
- Click on start segment to change its position on the grid
- Click on End segment to change its position on the grid
- Select the desired pathfinding algorithm from the dropdown menu.
- Click the "Start Algo" button to start the visualization.
- Click Load maze button to load a random maze
- Click the "Reset" button to reset the grid.
- Click darkmode toggler to switch between color modes
  

## Technologies Used
- React.js
- Vite
- CSS