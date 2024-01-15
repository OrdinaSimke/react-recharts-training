import { colors } from '@mui/material';
import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Label,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

export const Bars = (props) => {
  const { data } = props;
  const [activeIndex, setActiveIndex] = useState();

  const handleClick = (d, i, e) => {
    setActiveIndex(i);
  };

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value, offset, index } = props;

    return (
      <g>
        <text
          x={x}
          y={y}
          dx={index % 2 === 0 ? width - 50 : width + 8}
          dy={height / 2 + offset}
          fill={index % 2 === 0 ? '#fff' : '#111'}
          textAnchor="start"
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={data}>
        <XAxis type="number" hide />
        <YAxis dataKey="name" type="category" />
        <Bar dataKey="uv" fill="#8884d8" onClick={handleClick}>
          <LabelList dataKey="uv" content={renderCustomizedLabel} />
          {data.map((d, i) => (
            <Cell
              cursor="pointer"
              fill={i === activeIndex ? '#82ca9d' : '#8884d8'}
              key={`cell-${i}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
