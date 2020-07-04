import React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// TODO: create json file in assets
const steps: Array<string> = [
  "Create or join a topic",
  "Upload your multiple choice questions",
  "Install the alexa skill",
];

export default function WelcomeScreen() {
  return (
    <Grid item>
      <Grid item>
        <Typography variant="h5">Get up and running with 3 easy steps!</Typography>
        <Box m={2}></Box>
      </Grid>
      <Grid item>
        <List>
          {steps.map((step, index) => (
            <ListItem key={`step-${index}`}>
              <Typography variant="h6">{`${index + 1}. ${step}`}</Typography>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Box m={3}></Box>
    </Grid>
  );
}
