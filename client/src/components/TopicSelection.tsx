import React from "react";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

// TODO: This will be loaded and uploaded to server
const topics: Array<string> = ["mathematics", "physics", "computer science"];

export default function TopicSelection() {
  const history = useHistory();
  const value = "";

  function handleRoute(route: string) {
    history.push(`/topic/${route}`);
  }

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
          value={value}
          onChange={(event: any, newValue: any) => (newValue) ? handleRoute(newValue) : null}
          options={topics}
          getOptionLabel={(option: string) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Topic name"
              variant="outlined"
            ></TextField>
          )}
        />
      </Grid>
      <Box m={2}></Box>
      <Grid item>
        <Button size="large" variant="contained" color="primary">Create</Button>
      </Grid>
    </Grid>
  );
}
