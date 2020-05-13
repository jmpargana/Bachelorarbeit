import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// TODO: save this json in assets/json/routes.json
const routes: { [key: string]: string } = {
  Home: "/",
  Topic: "/topic",
  "Upload Question": "/upload-question"
};

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {Object.keys(routes).map(route => (
          <Button color="secondary" to={routes[route]} component={Link}>
            {route}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}
