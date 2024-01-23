import { useData } from 'contexts/useData';
import React from 'react';
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import * as d3 from 'd3';
import { useTheme } from '@mui/material';

export const Bars = (props) => {
  const theme = useTheme();
  const { data } = props;
  const { locale, selectedItem, setSelectedItem } = useData();

  const dataMax = Math.max(...data.map((o) => o.count));

  const myColor = d3
    .scaleLinear()
    .domain([0, dataMax])
    .range(['#fff', theme.palette.primary.main]);

  const handleClick = (d, i, e) => {
    setSelectedItem({ type: 'user', id: parseInt(d.userId) });
  };

  const handleClickTick = (d, i, e) => {
    setSelectedItem({ type: 'user', id: parseInt(d.value) });
  };

  if (!data || data.length === 0) return <></>;

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
        <Tooltip
          cursor={{ fill: theme.palette.divider }}
          labelStyle={{ color: theme.palette.text.primary }}
          itemStyle={{ color: theme.palette.text.primary }}
          contentStyle={{ background: theme.palette.background.default }}
          labelFormatter={(value) => 'userId: ' + value}
        />
        <XAxis type="number" hide />
        <YAxis
          dataKey="userId"
          type="category"
          interval={0}
          tick={{ fill: theme.palette.text.primary, cursor: 'pointer' }}
          axisLine={false}
          onClick={handleClickTick}
        />
        <Bar
          dataKey="count"
          onClick={handleClick}
          barSize={16}
          isAnimationActive={false}
        >
          <LabelList
            dataKey="count"
            position={'right'}
            formatter={(value) => locale.format('.1f')(value)}
          />
          {data.map((d, i) => (
            <Cell
              cursor="pointer"
              fill={
                selectedItem.type === 'user' &&
                selectedItem.id === parseInt(d.userId)
                  ? '#82ca9d'
                  : myColor(d.count)
              }
              key={`cell-${i}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
