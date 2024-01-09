import React from 'react';
import { Title } from 'components/Title/Title';
import { Box, Grid, Paper } from '@mui/material';
import { Bars } from 'components/Bars/Bars';
import { Lines } from 'components/Lines/Lines';
import { DataTable } from 'components/DataTable/DataTable';

export const Dashboard = (props) => {
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Title value="My title (click me)"></Title>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '360px' }}>
            <Bars />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '360px' }}>
            <Lines />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper sx={{ p: 0, height: '360px' }}>
            <DataTable />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
