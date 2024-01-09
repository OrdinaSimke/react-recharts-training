import { DataGrid } from '@mui/x-data-grid';
import { data } from 'data/data';
import React, { useState } from 'react';

const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'uv', headerName: 'UV value', width: 150 },
];

export const DataTable = (props) => {
  return <DataGrid rows={data} columns={columns} />;
};
