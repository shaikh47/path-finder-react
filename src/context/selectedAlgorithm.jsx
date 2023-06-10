/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const SeletedAlgorithmContext = createContext();

function AlgorithmProvider({ children }) {
  const [algorithm, setAlgorithm] = useState("Dijkstras");

  const valueToShare = {
    algorithm: algorithm,
    setAlgorithm: (algorithm) => {
      setAlgorithm(algorithm);
    },
  };

  return (
    <SeletedAlgorithmContext.Provider value={valueToShare}>
      {children}
    </SeletedAlgorithmContext.Provider>
  );
}

export { AlgorithmProvider };
export default SeletedAlgorithmContext;
