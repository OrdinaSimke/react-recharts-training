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
import { D3App } from 'components/D3ExampleWrong/D3App';
import D3AppCorrect from 'components/D3ExampleCorrect/D3AppCorrect';
import { MapGemeenten } from 'components/Map/Map';
import { FilterLine } from 'components/FilterLine/FilterLine';
import BasicScatter from 'components/MUI_Scatter/MUI_Scatter';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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
        const tmp = pickRandomCell(todoData);
        // Random number for province mapping
        tmp.provId = Math.floor(Math.random() * 11) + 1;
        // Fix for error in ID is geojson file (Id:10 is missing)
        tmp.provId = tmp.provId === 10 ? 12 : tmp.provId;
        sampleData.push(tmp);
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

  // Conditional rendering
  let bars, dataTable, mapBelgium, filters;
  if (todoData) {
    bars = <Bars data={barData} />;
    dataTable = <DataTable data={tableData} />;
    mapBelgium = <MapGemeenten data={tableData} />;
    filters = <FilterLine />;
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
                  Click on anything to filter the table below
                </Typography>
                <Paper elevation={0} sx={{ p: 2, height: '260px' }}>
                  {bars}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 0, height: '280px' }}>
                  {/* <Lines data={lineData} /> */}
                  {mapBelgium}
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} sx={{ pt: '0 !important' }}>
                <Paper elevation={0} sx={{ p: 1, height: '40px' }}>
                  {filters}
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} sx={{ pt: '8px !important' }}>
                <Paper elevation={0} sx={{ p: 0, height: '360px' }}>
                  {dataTable}
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <BottomContent />
      <D3App />
      <D3AppCorrect />
      <p>MUI Scatterplot (v7 unstable) - Voronoi tooltip (auto snap closest)</p>
      <p>Still in development, so not much flexibility yet</p>
      <BasicScatter />
    </>
  );
};
