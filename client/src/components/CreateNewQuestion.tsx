import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Add from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import axios from 'axios';

export default function CreateNewQuestion() {
  const [open, setOpen] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  const [answers, setAnswers] = React.useState<Array<string>>([]);
  const [correctAnswer, setCorrectAnswer] = React.useState(0);
  const [currentAnswer, setCurrentAnswer] = React.useState("");

  const handleCloseAndCreateNewTopic = () => {
    // TODO: Perform axios POST request to server to save new topic
    setOpen(false);
  };

  const handleSubmitAnswer = (e: any) => {
    setAnswers([...answers, currentAnswer]);
    setCurrentAnswer("");
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
      <Dialog open={open} fullScreen onClose={() => setOpen(false)}>
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          style={{ minHeight: "90vh" }}
        >
          <Paper elevation={3}>
            <Grid
              container
              direction="column"
              alignItems="flex-start"
              justify="space-between"
            >
              <Container>
                <DialogTitle>Create a new multiple choice question</DialogTitle>
                <TextField
                  margin="normal"
                  autoFocus
                  type="text"
                  label="Question"
                  value={question}
                  onChange={(e: any) => setQuestion(e.target.value)}
                />
                <Grid container direction="row">
                  <TextField
                    margin="normal"
                    autoFocus
                    type="text"
                    label="Create new Answer"
                    value={currentAnswer}
                    onChange={(e: any) => setCurrentAnswer(e.target.value)}
                  />
                  <Fab color="primary" aria-label="add">
                    <Add onClick={handleSubmitAnswer} />
                  </Fab>
                </Grid>
                <FormControl component="fieldset" name="Answers">
                  <RadioGroup value={correctAnswer} onChange={(e: any) => setCorrectAnswer(e.target.value)} >
                    {answers.map((answer, index) => (
                      <FormControlLabel key={`answer-${index}`} value={index} label={answer} control={<Radio />} />
                    ))}
                  </RadioGroup>
                </FormControl>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <DialogActions>
                    <Button
                      onClick={() => setOpen(false)}
                      color="primary"
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCloseAndCreateNewTopic}
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
