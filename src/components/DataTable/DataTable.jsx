import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useData } from 'contexts/useData';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useTheme } from '@mui/material';

export const DataTable = (props) => {
  const { data } = props;
  const { selectedItem } = useData();
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState(data);
  const theme = useTheme();

  useEffect(() => {
    const cols = [
      {
        field: 'id',
        headerName: 'id',
        width: 100,
        type: 'number',
        filterable: false,
      },
      { field: 'userId', headerName: 'userId', width: 100 },

      { field: 'title', headerName: 'title', flex: 1, minWidth: 50 },
      {
        field: 'completed',
        headerName: 'completed',
        width: 100,
        type: 'boolean',
        renderCell: (params) => {
          return params.value ? (
            <CheckBoxIcon style={{ color: theme.palette.success.main }} />
          ) : (
            <CheckBoxOutlineBlankIcon
              style={{
                color: theme.palette.grey[400],
              }}
            />
          );
        },
      },
      // {
      //   headerName: 'bar',
      //   flex: 1,
      //   minWidth: 50,
      //   sortable: false,
      //   filterable: false,
      //   renderCell: (row) => {
      //     const newRow = [
      //       {
      //         ...row.row,
      //         value: row.row.uv / row.row.max,
      //       },
      //     ];

      //     return (
      //       <Box sx={{ width: '100%', height: '50px' }}>
      //         <CellBar data={newRow}></CellBar>
      //       </Box>
      //     );
      //   },
      // },
    ];

    setColumns(cols);
  }, []);

  useEffect(() => {
    if (selectedItem.type === null) {
      setTableData(data);
      return;
    }

    if (selectedItem.type === 'user') {
      const tmp = data.filter(
        (d) => parseInt(d.userId) === parseInt(selectedItem.id)
      );
      setTableData(tmp);
      return;
    }

    if (selectedItem.type === 'prov') {
      const tmp = data.filter((d) => {
        const isHit = selectedItem.id.includes(parseInt(d.id));
        return isHit;
      });
      setTableData(tmp);
      return;
    }
  }, [data, selectedItem]);

  return (
    <DataGrid
      rows={tableData}
      columns={columns}
      loading={tableData.length === 0}
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      initialState={{
        columns: {
          columnVisibilityModel: {
            id: false,
          },
        },
      }}
      sx={{
        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
          width: '0.8em',
          height: '0.8em',
        },
        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
        },
        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
        '& .MuiDataGrid-virtualScroller': {
          // scrollbarColor: 'red blue',
          scrollbarWidth: 'thin',
        },
      }}
    />
  );
};
