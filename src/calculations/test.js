function dijkstra(graph, source) {
    const distances = {};
    const visited = {};
    const previous = {};
  
    // Initialize distances, visited, and previous values
    for (let vertex in graph) {
      distances[vertex] = Infinity;
      visited[vertex] = false;
      previous[vertex] = null;
    }
  
    distances[source] = 0;
  
    // Dijkstra's algorithm
    while (true) {
      let currentVertex = null;
      let shortestDistance = Infinity;
  
      // Find the unvisited vertex with the shortest distance
      for (let vertex in graph) {
        if (!visited[vertex] && distances[vertex] < shortestDistance) {
          currentVertex = vertex;
          shortestDistance = distances[vertex];
        }
      }
  
      if (currentVertex === null) {
        break;
      }
  
      // Mark the current vertex as visited
      visited[currentVertex] = true;
  
      // Update distances to neighboring vertices
      for (let neighbor in graph[currentVertex]) {
        let distance = distances[currentVertex] + graph[currentVertex][neighbor];
  
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          previous[neighbor] = currentVertex;
        }
      }
    }
  
    return { distances, previous };
  }
  
  // Example usage
  const numVertices = 12;
  const graph = {};
  
  for (let i = 0; i < numVertices; i++) {
    graph[i] = {};
  
    for (let j = 0; j < numVertices; j++) {
      if (i !== j) {
        graph[i][j] = 1; // Set the weight to 1 for all edges
      }
    }
  }
  
  const sourceVertex = 0;
  const result = dijkstra(graph, sourceVertex);
  
  console.log('Distances:', result.distances);
  console.log('Previous:', result.previous);
  