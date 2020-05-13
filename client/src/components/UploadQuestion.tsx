import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

export default function UploadQuestion() {
  return (
    <FormControl>
      <InputLabel htmlFor="my-input">Question</InputLabel>
      <Input id="my-input" aria-describedby="my-helper-text" />
    </FormControl>
  );
}
