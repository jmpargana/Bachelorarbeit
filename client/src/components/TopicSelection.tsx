import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
/* import useAutocomplete from "@material-ui/lab/useAutocomplete"; */
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// TODO: This will be loaded and uploaded to server
const topics: Array<string> = ["mathematics", "physics", "computer science"];

export default function TopicSelection() {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid item>
      <Typography variant="h4">Create or join a topic:</Typography>
      </Grid>
      <Box m={2}></Box>
      <Grid item style={{ width: 300 }}>
      <Autocomplete
        options={topics}
        renderInput={params => (
          <TextField {...params} label="Topic name" variant="outlined"></TextField>
        )}
      />
      </Grid>
    </Grid>
  );
}
