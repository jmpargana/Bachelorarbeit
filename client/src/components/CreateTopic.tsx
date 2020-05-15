import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// import axios from 'axios';

// TODO: Dialog needs some styling
const useStyles = makeStyles((theme) => ({
  fieldPadding: {
    padding: '30px'
  },
}));

export default function CreateTopic() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

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
        <DialogTitle>Create your new studying topic</DialogTitle>
        <TextField
          margin="normal"
          className={classes.fieldPadding}
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
