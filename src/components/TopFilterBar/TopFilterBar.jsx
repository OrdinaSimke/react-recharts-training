import React from 'react';
import {
  AppBar,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@mui/material';
import { scrollToRef } from 'utils/utils.ts';
import { useData } from 'contexts/useData';
import MenuIcon from '@mui/icons-material/Menu';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';

export const TopFilterBar = (props) => {
  const {
    handleDrawerToggle,
    completed,
    handleCompletedChange,
    completedValues,
    container,
  } = props;
  const { navbarHeight } = useData();

  return (
    <AppBar
      color="default"
      elevation={1}
      sx={{
        position: 'sticky',
        top: navbarHeight,
        minHeight: `64px !important`,
        height: 72,
      }}
    >
      <Toolbar
      // //Enable below if your toolbar extends appbar
      // sx={{
      //   minHeight: `48px !important`,
      //   height: 48,
      // }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Filter bar
        </Typography>
        <FormControl sx={{ m: 3, minWidth: 200 }} size="small">
          <InputLabel id="demo-simple-select-label">Completed?</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="completed-select"
            value={completed}
            label="Completed?"
            onChange={handleCompletedChange}
          >
            {completedValues.map((d) => {
              return <MenuItem value={d}>{d}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <VerticalAlignCenterIcon
          onClick={() => scrollToRef(container)}
          style={{
            cursor: 'pointer',
            marginLeft: 'auto',
          }}
        />
      </Toolbar>
    </AppBar>
  );
};
