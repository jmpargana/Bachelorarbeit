import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// TODO: create json file in assets
const steps: Array<string> = [
  "Create or join a topic",
  "Upload your multiple choice questions",
  "Interact with your smart speaker"
];

export default function WelcomeScreen() {
  return (
    <Grid direction="column" justify="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h4">Use your Smart Speaker to assist you studying!</Typography>
        <Box m={5}></Box>
      </Grid>
      <Grid item>
        <List>
          {steps.map((step, index) => (
            <ListItem key={`step-${index}`}>
              <Typography variant="h5">{`${index + 1}. ${step}`}</Typography>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Box m={5}></Box>
      <Grid container direction="column" justify="center" alignItems="center">
        <Button size="large" variant="contained" color="primary" >
          Get Started
        </Button>
      </Grid>
    </Grid>
  );
}
