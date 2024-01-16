import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';

import { useData } from 'contexts/useData';
import { Typography } from '@mui/material';

// IMPORTANT: Add following code in the component where you call the drawer, before the return:
{
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  //   const [isClosing, setIsClosing] = React.useState(false);
  //   const handleDrawerClose = () => {
  //     setIsClosing(true);
  //     setMobileOpen(false);
  //   };
  //   const handleDrawerTransitionEnd = () => {
  //     setIsClosing(false);
  //   };
  //   const handleDrawerToggle = () => {
  //     if (!isClosing) {
  //       setMobileOpen(!mobileOpen);
  //     }
  //   };
}

// IMPORTANT: Add a main box below the drawer in the component where you call drawer, example below:
{
  /* <Box
component="main"
id="main"
sx={{
  flexGrow: 1,
  p: 3,
  marginLeft: { sm: drawerWidth + 'px' },
  width: { sm: `calc(100% - ${drawerWidth}px)` },
}}
>
<Toolbar />
<INSERT_YOUR_CONTENT_HERE />
</Box> */
}

function ResponsiveDrawer(props) {
  const {
    fullScreen,
    divHeight,
    mobileOpen,
    handleDrawerClose,
    handleDrawerTransitionEnd,
  } = props;

  const { drawerWidth, navbarHeight } = useData();

  const drawer = (
    <div style={{ position: 'sticky', top: navbarHeight }}>
      <Divider />

      <ListItem key={'navbar'}>
        <Typography variant="h6" noWrap component="div">
          Navbar{' '}
        </Typography>
      </ListItem>

      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const drawerFullScreen = (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
      open
    >
      {drawer}
    </Drawer>
  );

  const drawerInDiv = (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        position: 'absolute',
        height: divHeight,

        '& .MuiDrawer-paper': {
          position: 'absolute',
          boxSizing: 'border-box',
          width: drawerWidth,
          overflow: 'clip',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
      open
    >
      {drawer}
    </Drawer>
  );

  return (
    <div>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {fullScreen ? drawerFullScreen : drawerInDiv}
      </Box>
    </div>
  );
}

export default ResponsiveDrawer;
