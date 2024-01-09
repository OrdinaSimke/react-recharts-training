import { data } from 'data/data';
import React, { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';

export const Bars = (props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
