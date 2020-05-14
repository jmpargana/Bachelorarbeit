import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

// TODO: save this json in assets/json/routes.json
const routes: { [key: string]: string } = {
  Home: "/",
  Topics: "/topics",
};

const useStyles = makeStyles(theme => ({
  appbar: {
    flexGrow: 1,
    alignSelf: "flex-end"
  }
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.appbar}>
        {Object.keys(routes).map((route, index) => (
          <Button key={`route-${index}`}color="inherit" to={routes[route]} component={Link}>
            {route}
          </Button>
        ))}
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
