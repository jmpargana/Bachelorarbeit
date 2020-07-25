import React, {useContext} from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Add from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { useAuth0 } from '../helpers/react-auth0-spa';
import { ObjectID } from "bson";
import Question from "../models/Question";
import {TopicContext} from "../context/context";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const questionAPI = "https://alexastudyingassistant.herokuapp.com/api/question"

export default function CreateNewQuestion() {
  const { state, dispatch } = useContext(TopicContext);
  const location = useLocation();
  const { user } = useAuth0();
  const topicID = new ObjectID(location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
  const userEmail = user.email;

  const [open, setOpen] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  const [answers, setAnswers] = React.useState<Array<string>>([]);
  const [correctAnswer, setCorrectAnswer] = React.useState("0");
  const [currentAnswer, setCurrentAnswer] = React.useState("");

  const handleCloseAndCreateNewQuestion = () => {
    if (!question || answers.length < 2 || parseInt(correctAnswer) < 0 || parseInt(correctAnswer) > answers.length - 1) return

    const newQuestion: Question = { _id: new ObjectID(), question, answers, correct: parseInt(correctAnswer), userEmail, topicID}
    const data = JSON.stringify(newQuestion)
    const uploadQuestion = async () => {
      await axios.post(questionAPI, data)
      if (Object.keys(state).length !== 0) 
        dispatch({type: 'UPLOAD_QUESTION', topicId: topicID.toString(), question: newQuestion})
    }
    uploadQuestion();
    resetQuestion();
    /* window.location.reload(false) */
    setOpen(false);
  };

  const handleSubmitAnswer = (e: any) => {
    setAnswers([...answers, currentAnswer]);
    setCurrentAnswer("");
  };

  const resetQuestion = () => {
    setCorrectAnswer("0");
    setQuestion("")
    setCurrentAnswer("");
    setAnswers([]);
  }

  const handleCancelAndReset = (e: any) => {
    resetQuestion();
    setOpen(false);
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
      <Dialog open={open} fullScreen onClose={() => setOpen(false)}>
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper 
            elevation={3}
            style={{
              height: "600px",
              width: "800px",
            }}
          >
            <Box m={5} />
            <Typography align="center" variant="h4">Create a new multiple choice question</Typography>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              style={{ height: "100%", width: "100%", padding: "20px 100px" }}
            >
              <Container>
                <TextField
                  margin="normal"
                  autoFocus
                  fullWidth
                  type="text"
                  label="Question"
                  value={question}
                  onChange={(e: any) => setQuestion(e.target.value)}
                />
                <TextField
                  margin="normal"
                  autoFocus
                  fullWidth
                  type="text"
                  label="Create new Answer"
                  value={currentAnswer}
                  onChange={(e: any) => setCurrentAnswer(e.target.value)}
                />
                <Grid container direction="row" justify="space-around" alignItems="center">
                  <Grid item>
                    <Typography align="center" variant="body1">Select the correct one:</Typography>
                  </Grid>
                  <Grid item>
                    <Fab color="primary" aria-label="add">
                      <Add onClick={handleSubmitAnswer} />
                    </Fab>
                  </Grid>
                </Grid>
                <Container style={{ padding: "0px 80px", height: "200px", width: "auto" }}>
                <FormControl component="fieldset" name="Answers">
                  <RadioGroup value={correctAnswer} onChange={(e: any) => setCorrectAnswer(e.target.value)} >
                    {answers.map((answer, index) => (
                      <FormControlLabel key={`answer-${index}`} value={`${index}`} label={answer} control={<Radio />} />
                    ))}
                  </RadioGroup>
                </FormControl>
                </Container>
                <Box m={3} />
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <DialogActions>
                    <Button
                      onClick={handleCancelAndReset}
                      color="primary"
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCloseAndCreateNewQuestion}
                      color="primary"
                      variant="contained"
                    >
                      Create
                    </Button>
                  </DialogActions>
                </Grid>
              </Container>
            </Grid>
          </Paper>
        </Grid>
      </Dialog>
    </>
  );
}
