import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useData } from 'contexts/useData';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const HeaderBar = (props) => {
  const { ColorModeContext } = props;
  const { navbarHeight } = useData();

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <AppBar
      color="default"
      sx={{
        position: 'sticky',
        zIndex: 10000,
        minHeight: navbarHeight,
        height: navbarHeight,
      }}
    >
      <Toolbar
        sx={{
          minHeight: `${navbarHeight}px !important`,
          height: navbarHeight,
        }}
      >
        <Typography variant="h6" noWrap component="div">
          Header bar
        </Typography>
        <IconButton
          sx={{ ml: 'auto' }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
