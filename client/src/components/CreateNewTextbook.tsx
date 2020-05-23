import React from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Textbook from "../models/Textbook";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";

const textbookAPI = "http://localhost:8080/api/textbook";

export default function CreateNewTextbook() {
  const [open, setOpen] = React.useState(false);
  const [newTextbook, setNewTextbook] = React.useState<Textbook>();

  const handleCloseAndCreateNewTopic = () => {
    const uploadTextbook = async () => {
      const data = JSON.stringify({});
      const result = await axios.post(textbookAPI, data);
      console.log({ result, newTextbook });
    };
    uploadTextbook();
    setOpen(false);
  };

  function handleUploadNewTextbook() {
    return;
  }

  function handleUploadPDF() {
    return;
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => setOpen(true)}
      >
        Upload New Textbook
      </Button>
      <Dialog open={open} fullScreen onClose={() => setOpen(false)}>
        <Box m={6} />
        <Grid container direction="row" justify="center" alignItems="center">
          <DialogTitle>
            Upload New Textbook from PDF File or Copy Contents
          </DialogTitle>
        </Grid>
        <DialogContent>
          <Grid container direction="row" justify="center" alignItems="center">
            <TextField label="Title" />
            <input id="pdf-upload" type="file" />
            <label htmlFor="pdf-upload">
              <Button
                onClick={handleUploadPDF}
                color="primary"
                variant="contained"
              >
                Upload PDF File
              </Button>
            </label>
          </Grid>
          <Box m={5} />
          <Grid item>
            <Box ml={20} mr={20}>
              <TextField
                fullWidth
                placeholder="Textbook's Content"
                label="Content"
                multiline
                rows={25}
              />
            </Box>
          </Grid>
        </DialogContent>
        <Grid container direction="row" justify="center" alignItems="center">
          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              color="primary"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUploadNewTextbook}
              color="primary"
              variant="contained"
            >
              Upload
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </>
  );
}
