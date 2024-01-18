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

export const Bars = (props) => {
  const { data } = props;
  const { selectedItem, setSelectedItem } = useData();

  const handleClick = (d, i, e) => {
    if (selectedItem === d.userId) {
      setSelectedItem(null);
    } else {
      setSelectedItem(d.userId);
    }
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
        <YAxis dataKey="userId" type="category" interval={0} />
        <Bar
          dataKey="count"
          fill="#8884d8"
          onClick={handleClick}
          barSize={16}
          isAnimationActive={false}
        >
          <LabelList dataKey="count" position={'right'} />
          {/* <LabelList dataKey="count" content={renderCustomizedLabel} /> */}
          {data.map((d, i) => (
            <Cell
              cursor="pointer"
              fill={d.userId === selectedItem ? '#82ca9d' : '#8884d8'}
              key={`cell-${i}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
