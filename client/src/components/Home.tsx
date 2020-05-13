import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";

const topics: Array<string> = ["mathematics", "physics", "computer science"];

export default function Home() {
  return <Autocomplete id="combo-box-demo" options={topics} />;
}
