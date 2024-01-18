import { Dashboard } from 'pages/Dashboard';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./scss/recharts.scss";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Dashboard></Dashboard>
      </ThemeProvider>
    </div>
  );
}

export default App;
