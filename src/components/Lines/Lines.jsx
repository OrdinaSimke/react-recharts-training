import React, { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';

export const Lines = (props) => {
  const { data } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <defs>
          <filter id="shadow" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="blur" />
            <feOffset in="blur" dx="0" dy="7" result="offsetBlur" />
            <feFlood
              floodColor="#006991"
              floodOpacity="0.5"
              result="offsetColor"
            />
            <feComposite
              in="offsetColor"
              in2="offsetBlur"
              operator="in"
              result="offsetBlur"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <Line
          type="monotone"
          strokeLinecap="round"
          dataKey="uv"
          stroke="#129a74"
          strokeWidth={2}
          filter="url(#shadow)"
          legendType="none"
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
