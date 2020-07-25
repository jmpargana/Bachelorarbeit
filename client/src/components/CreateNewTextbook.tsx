import React, {useRef, useContext} from "react";
import { useLocation } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Textbook from "../models/Textbook";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { ObjectID} from "bson";
import  { useAuth0 } from '../helpers/react-auth0-spa';
import {TopicContext} from "../context/context";
import Paper from "@material-ui/core/Paper";

// api endpoint to post the textbook to db
const textbookAPI = "https://alexastudyingassistant.herokuapp.com/api/textbook";

// api endpoint to request a conversion to txt from pdf
const pdfConverterAPI = "https://alexastudyingassistant.herokuapp.com/api/converter";

export default function CreateNewTextbook() {
  // Variables needed to save in database entry
  const location = useLocation();
  const { user } = useAuth0();
  const { state, dispatch } = useContext(TopicContext);

  const topicID = new ObjectID(location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
  const userEmail = user.email;

  // Hooks to deal with inputs
  const fileInput = useRef<HTMLInputElement>(null);
  const [titleError, setTitleError] = React.useState(false)
  const [bodyError, setBodyError] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');

  const handleCancelAndReset = (e: any) => {
    setTitle("");
    setBody("");
    setOpen(false);
  }

  /**
   * This method gets called with the submit button 
   * It should check if all fields are complete and perform axios post request
   * If the POST Request was successful, the data should be send to the
   * parent component to rerender the textbook expandable list
   */
  const handleUploadNewTextbook = () => {
    if (!title){
        setTitleError(true)
        return
    }
    if (!body) {
      setBodyError(true)
      return
    }

    const textbook: Textbook = { _id: new ObjectID(), title, body, topicID, userEmail};
    const data = JSON.stringify(textbook)

    const uploadTextbook = async () => {
      await axios.post(textbookAPI, data);
      if (Object.keys(state).length !== 0)
        dispatch({type: 'UPLOAD_TEXTBOOK', topicId: topicID.toString(), textbook})
    };
    uploadTextbook();
    /* window.location.reload(false) */
    setOpen(false);
  };

  /**
   *  handleUploadPDF is called when the input file button is pressed
   *  it performs a POST request to the server, which reads the pdf file
   *  and converts it to raw text saving it in the content variable
   *  
   * @param e event is ignored by method
   */
  function handleUploadPDF(e: any) {
    if (fileInput?.current?.files?.length === 1) {

      let file = fileInput.current.files[0]
      if (file.type !== "application/pdf") return

      const fetchTextFromPDF = async () => {
        let formData = new FormData();
        formData.append("textbook", file)

        const result = await axios.post(pdfConverterAPI, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setBody(result.data)
      }
      fetchTextFromPDF();
    }
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
      <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper
            elevation={3}
            style={{
              height: "800px",
              width: "1000px",
            }}
          >
            <Box m={5} />
            <Typography align="center" variant="h4">Upload a textbook</Typography>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              style={{ height: "100%", width: "100%", padding: "50px 100px" }}
            >
              <form autoComplete="off">
                <Grid container direction="column" spacing={3}>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Textbook title"
                      error={titleError}
                      value={title}
                      onChange={(e: any) => {
                        setTitle(e.target.value)
                        setTitleError(false)
                      }}
                      placeholder="The exhilarant world travel of Mike Thomas"
                    />
                  </Grid>
                  <Box m={1} />
                  <Grid item>
                    <input
                      id="pdf-upload"
                      type="file"
                      style={{ width: "100%" }}
                      onChange={handleUploadPDF}
                      ref={fileInput}
                    />
                    <label htmlFor="pdf-upload">
                      <Button component="span"></Button>
                    </label>
                  </Grid>
                  <Grid item>
                    <TextField
                      placeholder="All content comes here. You can load a pdf file a change it."
                      label="Textbook's Content"
                      multiline
                      error={bodyError}
                      fullWidth
                      onChange={(e: any) => {
                        setBodyError(false)
                        setBody(e.target.value)
                      }}
                      variant="outlined"
                      value={body}
                      rows={18}
                    />
                  </Grid>
                </Grid>
              </form>
              <Box m={2} />
              <Grid spacing={3} container justify="flex-end">
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleCancelAndReset}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleUploadNewTextbook}
                  >
                    Upload
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Dialog>
    </>
  );
}
