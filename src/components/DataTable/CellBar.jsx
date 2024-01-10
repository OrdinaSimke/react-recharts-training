import React, { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export const CellBar = (props) => {
  const { data } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={data} barSize={12}>
        <XAxis type="number" domain={[0, 1]} hide />
        <YAxis dataKey="name" type="category" hide />
        <Bar dataKey="value" fill="#aaa" background={{ fill: '#eee' }} />
      </BarChart>
    </ResponsiveContainer>
  );
};
