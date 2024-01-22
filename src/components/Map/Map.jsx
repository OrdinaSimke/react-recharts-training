import React from 'react';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

import useSWR from 'swr';

// import geoData from '../../data/gemeenten.json';
import Tooltip from '@mui/material/Tooltip';
import * as d3 from 'd3';
import { Typography, useTheme } from '@mui/material';

export const MapGemeenten = ({ data }) => {
  const theme = useTheme();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const swrOptions = {};

  const { data: geoData } = useSWR(
    'https://raw.githubusercontent.com/arneh61/Belgium-Map/master/Provincies.json',
    fetcher,
    swrOptions
  );

  const getMapData = (data) => {
    // Group by userId and count for the barchart
    let groupedData = data.reduce(
      (m, x) => ({ ...m, [x.provId]: (m[x.provId] || 0) + 1 }),
      {}
    );

    // Make array of objects
    groupedData = Object.keys(groupedData).map((key) => {
      return { provId: key, count: groupedData[key] };
    });

    groupedData.sort((a, b) => b.count - a.count);
    return groupedData;
  };

  if (!geoData) {
    return <></>;
  }
  return (
    <ComposableMap
      projection="geoAlbers"
      style={{ height: '100%', width: '100%' }}
      projectionConfig={{
        rotate: [-4.668, 0],
        center: [-0.43, 50.5],
        scale: 16000,
      }}
    >
      <Geographies geography={geoData} style={{ cursor: 'pointer' }}>
        {({ geographies, projection, path }) =>
          geographies.map((geo, idx) => {
            const mapData = getMapData(data);
            const currentData = mapData.find(
              (d) => parseInt(d.provId) === parseInt(geo.properties.ID_2)
            );

            const dataMax = Math.max(...mapData.map((o) => o.count));

            const myColor = d3
              .scaleLinear()
              .domain([0, dataMax])
              .range(['#fff', theme.palette.secondary.main]);

            return (
              // <Console log={geo.properties.n} />
              <Tooltip
                enterTouchDelay={0}
                title={`${geo.properties.NAME_2}: ${currentData.count}`}
                arrow
                disableInteractive
                key={idx}
              >
                <Geography
                  key={geo.ID_2}
                  geography={geo}
                  fill={
                    currentData
                      ? myColor(currentData.count)
                      : theme.palette.background.default
                  }
                  stroke={'#ddd'}
                  strokeWidth={1}
                  style={{
                    default: {
                      outline: 'none',
                    },
                    hover: {
                      fill: '#aa3355',
                      opacity: 1,
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#aa3355',
                      opacity: 1,
                      outline: 'none',
                    },
                  }}
                  className="my-anchor-element"
                />
              </Tooltip>
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};
