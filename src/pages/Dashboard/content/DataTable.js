import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'log_id', 
    headerName: 'Id do Log', 
    width: 90 
  },
  {
    field: 'device_id',
    headerName: 'Id do Dispositivo',
    width: 130,
  },
  {
    field: 'change_date',
    headerName: 'Data da Alteração',
    width: 200,
  },
  {
    field: 'log_from',
    headerName: 'Status Antigo',
    width: 120,
  },
  {
    field: 'log_to',
    headerName: 'Status Novo',
    width: 90,
  },
];

export default function DataTable(props) {

  return (
    <Grid sx={{height: "70vh"}} container spacing={2}>
      <Grid item lg={12}>
      <DataGrid
        rows={props.Data}
        columns={columns}
        getRowId={(row) => row.log_id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      </Grid>
    </Grid>
  );
}