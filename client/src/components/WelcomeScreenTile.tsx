import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function WelcomeScreenTile(props: {
  message: string,
  color: string,
}) {
  return (
    <Card style={{
      textAlign: 'center',
      display: 'block',
      backgroundColor: props.color,
      width: 400,
      height: 400,
    }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ height: '100%' }}
      >
        <Typography variant="h4" style={{ color: 'white' }}>{props.message}</Typography>
      </Grid>
    </Card>
  )
}
