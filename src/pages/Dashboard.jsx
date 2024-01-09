import React from 'react';
import { Title } from '../components/Title/Title';
import { Box, Grid, Paper } from '@mui/material';

export const Dashboard = (props) => {
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Title value="My title (click me)"></Title>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>Bars</Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>Lines</Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper sx={{ p: 2 }}>Table</Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
