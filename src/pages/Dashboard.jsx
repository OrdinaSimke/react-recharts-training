import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Title } from 'components/Title/Title';
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Bars } from 'components/Bars/Bars';
import { Lines } from 'components/Lines/Lines';
import { DataTable } from 'components/DataTable/DataTable';

import { data } from 'data/data';
import ResponsiveDrawer from 'components/Drawer/ResponsiveDrawer';
import { useData } from 'contexts/useData';

export const Dashboard = (props) => {
  const { drawerWidth, navbarHeight } = useData();

  let container = useRef(null);

  let [height, setHeight] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setHeight(container.current.offsetHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [myData, setMyData] = useState([]);

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

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const newData = data.map((d) => {
      d.max = randomNumberInRange(d.uv, d.uv * 5);
      return d;
    });
    setMyData(newData);
  }, []);

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
              minHeight: `48px !important`,
              height: 48,
            }}
          >
            <Toolbar
              sx={{
                minHeight: `48px !important`,
                height: 48,
              }}
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
            </Toolbar>
          </AppBar>

          <Box sx={{ p: 3, pt: 6 }}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" noWrap component="div">
                  barchart title
                </Typography>
                <Paper sx={{ p: 2, height: '360px' }}>
                  <Bars
                    data={structuredClone(myData).sort(function (a, b) {
                      return b.uv - a.uv;
                    })}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" noWrap component="div">
                  linechart title
                </Typography>
                <Paper sx={{ p: 2, height: '360px' }}>
                  <Lines data={myData} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h6" noWrap component="div">
                  datatable title
                </Typography>
                <Paper sx={{ p: 0, height: '360px' }}>
                  <DataTable data={myData} />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

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
