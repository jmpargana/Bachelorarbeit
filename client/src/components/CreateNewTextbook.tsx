import React, {useRef} from "react";
import { useLocation } from "react-router-dom";
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
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { ObjectID} from "bson";
import  { useAuth0 } from '../helpers/react-auth0-spa';

// api endpoint to post the textbook to db
const textbookAPI = "http://localhost:8080/api/textbook";

// api endpoint to request a conversion to txt from pdf
const pdfConverterAPI = "http://localhost:8080/api/converter";

export default function CreateNewTextbook() {
  // Variables needed to save in database entry
  const location = useLocation();
  const { user } = useAuth0();
  const topicID = new ObjectID(location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
  const userID = user._id;

  // Hooks to deal with inputs
  const fileInput = useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  /**
   * This method gets called with the submit button 
   * It should check if all fields are complete and perform axios post request
   * If the POST Request was successful, the data should be send to the
   * parent component to rerender the textbook expandable list
   */
  const handleUploadNewTextbook = () => {
    // TODO: Check if all fields are complete

    const textbookID = new ObjectID();
    const textbook: Textbook = { _id: textbookID, title: title, body: content, topicID, userID};
    const data = JSON.stringify(textbook)

    const uploadTextbook = async () => {
      const result = await axios.post(textbookAPI, data);
      console.log({result})
    };
    uploadTextbook();
    // setOpen(false);

    // return new textbook to parent component
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
        setContent(result.data)
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
      <Dialog open={open} fullScreen onClose={() => setOpen(false)}>
        <Box m={6} />
        <Grid container direction="row" justify="center" alignItems="center">
          <DialogTitle>
            <Typography variant="h5">Upload New Textbook from PDF File or Copy Contents</Typography>
          </DialogTitle>
        </Grid>
        <Grid item>
        <DialogContent>
          <Grid container direction="row" justify="center" alignItems="center">
            <TextField label="Title" value={title} onChange={(e: any) => setTitle(e.target.value)} />
            <input id="pdf-upload" type="file" onChange={handleUploadPDF} ref={fileInput} />
          </Grid>
          <Box m={5} />
          <Grid item>
            <Container fixed>
              <TextField
                fullWidth
                placeholder="Textbook's Content"
                label="Content"
                value={content}
                multiline
                rows={25}
              />
            </Container>
          </Grid>
        </DialogContent>
        </Grid>
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
