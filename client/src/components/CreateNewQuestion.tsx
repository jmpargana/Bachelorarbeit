import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// import axios from 'axios';

export default function CreateNewQuestion() {
  const [open, setOpen] = React.useState(false);

  const handleCloseAndCreateNewTopic = () => {
    // TODO: Perform axios POST request to server to save new topic
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => setOpen(true)}
      >
        Create
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Create a new multiple choice question</DialogTitle>
        <TextField
          margin="normal"
          autoFocus
          type="text"
        />
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseAndCreateNewTopic} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
