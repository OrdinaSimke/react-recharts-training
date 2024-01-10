import React, { useState } from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

export const Lines = (props) => {
  const { data } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};
