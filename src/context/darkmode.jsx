/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const DarkModeContext = createContext();

function Provider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  const valueToShare = {
    darkMode: darkMode,
    toggleDarkMode: () => {
      setDarkMode(!darkMode);
    },
  };

  return (
    <DarkModeContext.Provider value={valueToShare}>
      {children}
    </DarkModeContext.Provider>
  );
}

export { Provider };
export default DarkModeContext;
