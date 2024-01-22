import { Dashboard } from 'pages/Dashboard';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './scss/recharts.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { HeaderBar } from 'components/HeaderBar/HeaderBar';
import { CssBaseline } from '@mui/material';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <HeaderBar ColorModeContext={ColorModeContext} />
          <Dashboard></Dashboard>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
