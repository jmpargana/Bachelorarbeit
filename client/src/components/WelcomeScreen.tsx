import React from "react";
import Grid from "@material-ui/core/Grid";
import WelcomeScreenTile from './WelcomeScreenTile';

// TODO: create json file in assets
const steps: [string, string][] = [
  ["Open topic", "#ffb400"],
  ["Upload questions", "#3e92a3"],
  ["Install the alexa skill", "#ea5455"]
];

export default function WelcomeScreen() {
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      {steps.map((step, i) => (
        <WelcomeScreenTile
          key={`paper-step-${i}`}
          message={step[0]}
          color={step[1]}
        />
      ))}
    </Grid>
  );
}
