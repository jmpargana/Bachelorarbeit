import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextBooksExtension from './TextBooksExtension';
import QuestionExtension from "./QuestionExtension";
import Textbook from '../models/Textbook';
import Question from '../models/Question';

// For server requests
/* import axios from 'axios'; */

// TODO: this will be loaded from server
const mockTexts: Array<Textbook> = [
  { title: "Textbook 1 about mathematics", body: "Long text with many paragraphs" },

  { title: "Textbook 1 about mathematics", body: "Long text with many paragraphs" },
  { title: "Textbook 1 about mathematics", body: "Long text with many paragraphs" },
  { title: "Textbook 1 about mathematics", body: "Long text with many paragraphs" }
];

// TODO: this will be loaded from server
const mockQuestions: Array<Question> = [
  {
    question: "How many things does a thing have?",
    answers: ["One thing", "Two things", "no thing", "your thing"],
    correct: 3
  },
  {
    question: "How many things does a thing have?",
    answers: ["One thing", "Two things", "no thing", "your thing"],
    correct: 3
  },
  {
    question: "How many things does a thing have?",
    answers: ["One thing", "Two things", "no thing", "your thing"],
    correct: 3
  },
  {
    question: "How many things does a thing have?",
    answers: ["One thing", "Two things", "no thing", "your thing"],
    correct: 3
  },
  {
    question: "How many things does a thing have?",
    answers: ["One thing", "Two things", "no thing", "your thing"],
    correct: 3
  },
  {
    question: "How many things does a thing have?",
    answers: ["One thing", "Two things", "no thing", "your thing"],
    correct: 3
  }
];

export default function Topic() {
  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <Box m={3}></Box>
      <Grid item>
        <Typography variant="h2">Topic</Typography>
      </Grid>
      <Box m={1}></Box>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <TextBooksExtension textbooks={mockTexts} />
        <QuestionExtension questions={mockQuestions} />
      </Grid>
    </Grid>
  );
}
