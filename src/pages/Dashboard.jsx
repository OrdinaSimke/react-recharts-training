import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Title } from 'components/Title/Title';
import {
  AppBar,
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Bars } from 'components/Bars/Bars';
import { DataTable } from 'components/DataTable/DataTable';

import ResponsiveDrawer from 'components/Drawer/ResponsiveDrawer';
import { useData } from 'contexts/useData';
import useSWR from 'swr';

export const Dashboard = (props) => {
  const { drawerWidth, navbarHeight } = useData();
  const [allData, setAllData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [height, setHeight] = useState(null);
  const [completed, setCompleted] = React.useState('All');
  const [completedValues, setCompletedValues] = React.useState([]);
  let container = useRef(null);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const swrOptions = {};

  const { data: todoData } = useSWR(
    `https://jsonplaceholder.typicode.com/todos`,
    fetcher,
    swrOptions
  );

  useLayoutEffect(() => setHeight(container.current.clientHeight), [todoData]);

  // Drawer
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  // End Drawer

  function pickRandomCell(data) {
    return data[Math.floor(Math.random() * data.length)];
  }

  useEffect(() => {
    if (todoData) {
      // Take a random sample
      let sampleData = [];
      for (let i = 0; i < 120; i++) {
        sampleData.push(pickRandomCell(todoData));
      }

      const jsonObject = sampleData.map(JSON.stringify);
      const uniqueSet = new Set(jsonObject);
      const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

      const sortedArray = uniqueArray.sort((a, b) => a.userId - b.userId);
      setAllData(sortedArray);
      setTableData(sortedArray);
      setBarData(getBarData(sortedArray));

      // Get list of values for completed dropdown
      let values = ['All'].concat([
        ...new Set(sortedArray.map((d) => d.completed.toString())),
      ]);
      console.log('completedValues', completedValues);
      setCompletedValues(values);
    }
  }, [todoData]);

  const getBarData = (data) => {
    // Group by userId and count for the barchart
    let groupedData = data.reduce(
      (m, x) => ({ ...m, [x.userId]: (m[x.userId] || 0) + 1 }),
      {}
    );

    // Make array of objects
    groupedData = Object.keys(groupedData).map((key) => {
      return { userId: key, count: groupedData[key] };
    });

    groupedData.sort((a, b) => b.count - a.count);
    return groupedData;
  };

  useEffect(() => {
    console.log('completed', completed);
    if (completed === 'All') {
      setTableData(allData);
      setBarData(getBarData(allData));
    } else {
      const filteredData = allData.filter(
        (d) => d.completed.toString() === completed
      );
      setTableData(filteredData);
      setBarData(getBarData(filteredData));
    }
  }, [completed, allData]);

  let bars;
  let dataTable;
  if (todoData) {
    bars = <Bars data={barData} />;
    dataTable = <DataTable data={tableData} />;
  } else {
    bars = <div>Data loading</div>;
    dataTable = <div>Data loading</div>;
  }

  const handleCompletedChange = (event) => {
    setCompleted(event.target.value);
  };

  return (
    <>
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
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Title
          value="React Basic Training"
          style={{ paddingTop: '12px' }}
        ></Title>

        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
      <Box ref={container}>
        <ResponsiveDrawer
          fullScreen={false}
          divHeight={height}
          mobileOpen={mobileOpen}
          handleDrawerClose={handleDrawerClose}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        />

        <Box
          component="main"
          id="main"
          sx={{
            flexGrow: 1,
            p: 0,
            marginLeft: { sm: drawerWidth + 'px' },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <AppBar
            elevation={1}
            sx={{
              backgroundColor: '#FFF',
              color: '#333',
              position: 'sticky',
              top: navbarHeight,
              minHeight: `64px !important`,
              height: 64,
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
                <InputLabel id="demo-simple-select-label">
                  Completed?
                </InputLabel>
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
            </Toolbar>
          </AppBar>

          <Box sx={{ p: 3, pt: 6 }}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">
                  Click on a bar to filter the table below
                </Typography>
                <Paper elevation={0} sx={{ p: 2, height: '260px' }}>
                  {bars}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  blanditiis tenetur
                </Typography>
                <Paper elevation={0} sx={{ p: 2, height: '260px' }}>
                  {/* {lines} */}
                </Paper>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  blanditiis tenetur
                </Typography>
                <Paper elevation={0} sx={{ p: 0, height: '360px' }}>
                  {dataTable}
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      )
      <Box sx={{ p: 3 }}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </>
  );
};
