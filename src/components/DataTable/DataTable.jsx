import {
  DataGrid,
  GridToolbar,
  getGridNumericOperators,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { CellBar } from './CellBar';
import { Box } from '@mui/material';
import { useData } from 'contexts/useData';

export const DataTable = (props) => {
  const { data } = props;
  const { selectedItem } = useData();
  const [columns, setColumns] = useState([]);
  const [tableFilters, setTableFilters] = useState({
    items: [{}],
  });

  useEffect(() => {
    const cols = [
      { field: 'id', headerName: 'id', width: 100, type: 'number' },
      { field: 'name', headerName: 'Name', width: 100 },
      { field: 'uv', headerName: 'UV value', width: 100 },
      { field: 'max', headerName: 'max value', width: 100 },
      {
        headerName: 'bar',
        flex: 1,
        minWidth: 50,
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

  useEffect(() => {
    // https://mui.com/x/react-data-grid/filtering/customization/
    // console.log(getGridNumericOperators());

    if (selectedItem !== null) {
      setTableFilters({
        items: [{ field: 'id', operator: '=', value: selectedItem }],
      });
    } else {
      setTableFilters({
        items: [{}],
      });
    }
  }, [selectedItem]);

  return (
    <DataGrid
      rows={data}
      columns={columns}
      // @ts-ignore
      filterModel={tableFilters}
      onFilterModelChange={(newFilterModel) => setTableFilters(newFilterModel)}
      initialState={{
        columns: {
          columnVisibilityModel: {
            id: false,
          },
        },
      }}
    />
  );
};
