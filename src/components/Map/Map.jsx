import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import useSWR from 'swr';
// import geoData from '../../data/gemeenten.json';
import Tooltip from '@mui/material/Tooltip';
import * as d3 from 'd3';
import { useTheme } from '@mui/material';
import { useData } from 'contexts/useData';

export const MapGemeenten = ({ data }) => {
  const { selectedItem, setSelectedItem } = useData();
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

  const handleClick = (row, geo) => {
    if (!row || row.length === 0) return;
    let values = [...new Set(row.map((d) => parseInt(d['id'])))];
    setSelectedItem({
      type: 'prov',
      id: values,
      provId: row[0].provId,
      prov: geo.NAME_2,
    });
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
            let currentData = mapData.find(
              (d) => parseInt(d.provId) === parseInt(geo.properties.ID_2)
            );
            currentData = !currentData
              ? { count: 0, provId: parseInt(geo.properties.ID_2) }
              : currentData;

            let currentRawData = data.filter(
              (d) => parseInt(d.provId) === parseInt(geo.properties.ID_2)
            );

            const dataMax = Math.max(...mapData.map((o) => o.count));

            const myColor = d3
              .scaleLinear()
              .domain([0, dataMax])
              .range(['#fff', theme.palette.secondary.main]);

            return (
              <Tooltip
                enterTouchDelay={0}
                title={`${geo.properties.NAME_2}: ${currentData?.count}`}
                arrow
                disableInteractive
                key={idx}
              >
                <Geography
                  key={geo.ID_2}
                  geography={geo}
                  onClick={() => handleClick(currentRawData, geo.properties)}
                  fill={
                    currentData
                      ? parseInt(currentData.provId) ===
                        parseInt(selectedItem.provId)
                        ? '#82ca9d'
                        : myColor(currentData.count)
                      : theme.palette.background.default
                  }
                  stroke={'#ddd'}
                  strokeWidth={1}
                  style={{
                    default: {
                      outline: 'none',
                    },
                    hover: {
                      // fill: '#aa3355',
                      opacity: 1,
                      outline: 'none',
                    },
                    pressed: {
                      // fill: '#aa3355',
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
