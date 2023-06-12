import Navbar from "../components/Navbar/Navbar";
import DarkModeContext from "../context/darkmode";
import { useContext } from "react";

function About() {
  const { darkMode } = useContext(DarkModeContext);

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
          background: darkMode ? "" : "white",
        }}
      >
        <h1
          style={{
            color: darkMode ? "" : "black",
          }}
        >
          About
        </h1>
        <p
          style={{
            color: darkMode ? "white" : "black",
            fontSize: "1.1rem"
          }}
        >
          This is a Algorithm Visualizer application which was built using
          Javascript front end Library React JS
        </p>
      </div>
    </>
  );
}

export default About;
