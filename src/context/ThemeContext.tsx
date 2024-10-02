import React, {createContext, useContext, useState} from 'react';
const initialValue: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
} = {
  isDarkMode: false,
  toggleDarkMode: () => {},
};

export const ThemeContext = createContext(initialValue);

export const ThemeProvider = ({children}: {children: any}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  return (
    <ThemeContext.Provider value={{isDarkMode, toggleDarkMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
