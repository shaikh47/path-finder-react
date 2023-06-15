import Navbar from "../components/Navbar/Navbar";
import DarkModeContext from "../context/darkmode";
import { useContext } from "react";
import "./Home.css";

function About() {
  const { darkMode } = useContext(DarkModeContext);

  function handleDrag() {
    console.log("Dragging...");
  }

  return (
    <>
      <Navbar current="about" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          backgroundImage: "url(src/assets/nature-3082832.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          draggable
          onDrag={handleDrag}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            padding: "16px",
            maxWidth: "600px",
            margin: "10px",
            textAlign: "center",
            color: "white",
            fontSize: "1.1rem",
          }}
        >
          <h1>About</h1>
          <p>
            This is a Algorithm Visualizer application which was built using
            Javascript front end Library React JS.
          </p>
          <p>
            Currently Dijkstras Shortest Path finder and Depth First Search
            graph traversal has been Implemented.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="button">Button 1</div>
            <div className="button">Button 2</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
