import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { Bars } from 'components/Bars/Bars';
import { DataTable } from 'components/DataTable/DataTable';
import ResponsiveDrawer from 'components/Drawer/ResponsiveDrawer';
import { useData } from 'contexts/useData';
import useSWR from 'swr';
import { TopContent } from 'components/TopContent/TopContent';
import { TopFilterBar } from 'components/TopFilterBar/TopFilterBar';
import { BottomContent } from 'components/BottomContent/BorttomContent';
// import { Lines } from 'components/Lines/Lines';
// import { lineData } from 'data/data';

export const Dashboard = (props) => {
  const { drawerWidth } = useData();
  const [allData, setAllData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [height, setHeight] = useState(null);
  const [completed, setCompleted] = React.useState('All');
  const [completedValues, setCompletedValues] = React.useState([]);

  const theme = useTheme();

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const swrOptions = {};

  const { data: todoData } = useSWR(
    `https://jsonplaceholder.typicode.com/todos`,
    fetcher,
    swrOptions
  );

  const container = useRef(null);

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

  const handleCompletedChange = (event) => {
    setCompleted(event.target.value);
  };

  const pickRandomCell = (data) => {
    return data[Math.floor(Math.random() * data.length)];
  };

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

  const getValuesForCompletedDropdown = (data, field) => {
    const values = ['All'].concat([
      ...new Set(data.map((d) => d[field].toString())),
    ]);

    return values;
  };

  const randomSampleFromData = useMemo(() => {
    // useMemo because it is a heavier calculation (possibly)
    // Unlike useEffect, React.useMemo does not trigger every time you change one of its dependencies.

    // A memoized function will first check to see if the dependencies have changed since the last render.
    // If so, it executes the function and returns the result.
    // If false, it simply returns the cached result from the last execution.

    if (todoData) {
      let sampleData = [];
      for (let i = 0; i < 120; i++) {
        sampleData.push(pickRandomCell(todoData));
      }

      const jsonObject = sampleData.map(JSON.stringify);
      const uniqueSet = new Set(jsonObject);
      const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

      const sortedArray = uniqueArray.sort((a, b) => a.userId - b.userId);
      return sortedArray;
    }
  }, [todoData]);

  useEffect(() => {
    // Do this only when our source data changes
    if (randomSampleFromData) {
      setAllData(randomSampleFromData);
      setTableData(randomSampleFromData);
      setBarData(getBarData(randomSampleFromData));

      // Get list of values for populating the 'completed' dropdown
      const values = getValuesForCompletedDropdown(
        randomSampleFromData,
        'completed'
      );
      setCompletedValues(values);
    }
  }, [randomSampleFromData]);

  useEffect(() => {
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

  useLayoutEffect(() => setHeight(container.current.clientHeight), [todoData]);

  // Conditional rendering
  let bars;
  let dataTable;
  if (todoData) {
    bars = <Bars data={barData} />;
    dataTable = <DataTable data={tableData} />;
  } else {
    bars = <div>Data loading</div>;
    dataTable = <div>Data loading</div>;
  }

  return (
    <>
      <TopContent />

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
            borderBottom: '1px solid ' + theme.palette.divider,
            borderTop: '1px solid ' + theme.palette.divider,
          }}
        >
          <TopFilterBar
            handleDrawerToggle={handleDrawerToggle}
            completed={completed}
            handleCompletedChange={handleCompletedChange}
            completedValues={completedValues}
            container={container}
          />

          <Box sx={{ p: 3, pt: 8 }}>
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
                  {/* <Lines data={lineData} /> */}
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

      <BottomContent />
    </>
  );
};
