import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { CellBar } from './CellBar';
import { Box } from '@mui/material';

export const DataTable = (props) => {
  const { data } = props;
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const cols = [
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'uv', headerName: 'UV value', width: 100 },
      { field: 'max', headerName: 'max value', width: 100 },
      {
        headerName: 'bar',
        flex: 1,
        minWidth: 150,
        sortable: false,
        filterable: false,
        renderCell: (row) => {
          const newRow = [
            {
              ...row.row,
              value: row.row.uv / row.row.max,
            },
          ];

          return (
            <Box sx={{ width: '100%', height: '50px' }}>
              <CellBar data={newRow}></CellBar>
            </Box>
          );
        },
      },
    ];

    setColumns(cols);
  }, []);

  return <DataGrid rows={data} columns={columns} />;
};
