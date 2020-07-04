import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

export default function GetStarted() {
  return (
      <Grid item>
        <Button size="large" variant="contained" color="secondary" to="/topics" component={Link}>
          Get Started
        </Button>
      </Grid>
  );
}
