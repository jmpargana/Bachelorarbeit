import React from "react";
import { useHistory } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { ObjectID } from "bson";

const topicAPI = "http://localhost:8080/api/topic"; 
 
// TODO: Dialog needs some styling
const useStyles = makeStyles((theme) => ({
  fieldPadding: {
    padding: '30px'
  },
}));

export default function CreateTopic() {
  const [open, setOpen] = React.useState(false);
  const [newTopic, setNewTopic] = React.useState("");
  const history = useHistory();
  const classes = useStyles();

  const handleCloseAndCreateNewTopic = () => {
    const newTopicID = new ObjectID();
    const uploadTopic = async () => {
      const data = JSON.stringify({ '_id': newTopicID, 'name': newTopic })
      const result = await axios.post(topicAPI, data)
      console.log({result, newTopic})
    }
    uploadTopic();
    history.push(`/topic/${newTopicID.toString()}`)
  };

  function handleNewTopicNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTopic(e.target.value)
  }

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
          value={newTopic}
          onChange={handleNewTopicNameChange}
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
