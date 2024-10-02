import React from 'react';
import {ThemeProvider} from './src/context/ThemeContext';
import Calculator from './src/screens/Calculator';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Calculator />
    </ThemeProvider>
  );
};

export default App;
