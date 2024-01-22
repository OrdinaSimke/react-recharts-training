import { useData } from 'contexts/useData';
import React from 'react';
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import * as d3 from 'd3';
import { useTheme } from '@mui/material';

export const Bars = (props) => {
  const theme = useTheme();
  const { data } = props;
  const { selectedItem, setSelectedItem } = useData();
  const myColor = d3
    .scaleLinear()
    .domain([0, 20])
    .range(['#fff', theme.palette.primary.main]);

  const handleClick = (d, i, e) => {
    if (selectedItem === d.userId) {
      setSelectedItem(null);
    } else {
      setSelectedItem(d.userId);
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 0,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis type="number" hide />
        <YAxis
          dataKey="userId"
          type="category"
          interval={0}
          tick={{ fill: theme.palette.text.primary }}
        />
        <Bar
          dataKey="count"
          onClick={handleClick}
          barSize={16}
          isAnimationActive={false}
        >
          <LabelList dataKey="count" position={'right'} />
          {data.map((d, i) => (
            <Cell
              cursor="pointer"
              fill={d.userId === selectedItem ? '#82ca9d' : myColor(d.count)}
              key={`cell-${i}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
