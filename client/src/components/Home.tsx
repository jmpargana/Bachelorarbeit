import React from "react";
import Grid from "@material-ui/core/Grid";
import WelcomeScreen from './WelcomeScreen';
import GetStarted from "./GetStarted";
import Title from '../assets/svg/title.svg';

export default function Home() {
  return (
    <Grid 
      container 
      direction="column" 
      alignItems="center"
      justify="space-around"
      style={{ minHeight: "80vh" }}
    >
      <Grid item>
        <img src={Title} alt="Title" style={{ width: '100%', height: 'auto'}} />
      </Grid>
        <WelcomeScreen />
        <GetStarted />
    </Grid>
  );
}
