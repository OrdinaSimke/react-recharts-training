import React, { useEffect, useState } from 'react';
import { Title } from 'components/Title/Title';
import { Box, Grid, Paper } from '@mui/material';
import { Bars } from 'components/Bars/Bars';
import { Lines } from 'components/Lines/Lines';
import { DataTable } from 'components/DataTable/DataTable';

import { data } from 'data/data';
import TemporaryDrawer from 'components/Drawer/TemporaryDrawer';

export const Dashboard = (props) => {
  const [myData, setMyData] = useState([]);

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
    <Box sx={{ width: '100%', p: 2 }}>
      <Title value="My title (click me)"></Title>

      <TemporaryDrawer />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '360px' }}>
            <Bars
              data={structuredClone(myData).sort(function (a, b) {
                return b.uv - a.uv;
              })}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '360px' }}>
            <Lines data={myData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper sx={{ p: 0, height: '360px' }}>
            <DataTable data={myData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
