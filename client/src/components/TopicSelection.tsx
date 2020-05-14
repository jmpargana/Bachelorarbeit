import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import useAutocomplete from "@material-ui/lab/useAutocomplete";

const topics: Array<string> = ["mathematics", "physics", "computer science"];

export default function TopicSelection() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={topics}
      renderInput={params => (
        <TextField {...params} label="Disabled options" variant="outlined"></TextField>
      )}
    />
  );
}
