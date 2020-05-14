import React from "react";
import Grid from "@material-ui/core/Grid";
import WelcomeScreen from './WelcomeScreen';

export default function Home() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "80vh" }}
    >
      <WelcomeScreen />
    </Grid>
  );
}
