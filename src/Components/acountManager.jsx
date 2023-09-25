import React from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

function acountManager() {
  return (
    <Grid container>
      <Grid item xs>
        <Link
          href="#test"
          variant="body2"
        >
          Forgot password?
        </Link>
      </Grid>
      <Grid item>
        <Link href="#test2" variant="body2">
          Dont have an account? Sign Up
        </Link>
      </Grid>
    </Grid>
  );
}

export default acountManager;
