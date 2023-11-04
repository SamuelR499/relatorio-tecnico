import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';

export default function Despesa() {
  return (
    <>
      <CssBaseline />
      <Chart />
      <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
        <Paper
          sx={ {
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          } }
        >
          <Deposits />
        </Paper>
      </Grid>
      <Grid item xs={ 12 }>
        <Paper sx={ { p: 2, display: 'flex', flexDirection: 'column' } }>
          <Orders />
        </Paper>
      </Grid>
    </>
  );
}
