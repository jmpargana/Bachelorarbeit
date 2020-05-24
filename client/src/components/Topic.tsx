import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextBooksExtension from "./TextBooksExtension";
import QuestionExtension from "./QuestionExtension";
import Textbook from "../models/Textbook";
import Question from "../models/Question";
import axios from "axios";

const questionAPI: string = "http://localhost:8080/api/questions/";
const textbookAPI: string = "http://localhost:8080/api/textbooks/";

export default function Topic() {
  const location = useLocation();
  const topicID = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
  const [questions, setQuestions] = useState<Array<Question>>(new Array<Question>());
  const [textbooks, setTextbooks] = useState<Array<Textbook>>(new Array<Textbook>());

  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await axios(questionAPI + topicID);
      setQuestions(result.data);
    };
    const fetchTextbooks = async () => {
      const result = await axios(textbookAPI + topicID);
      setTextbooks(result.data);
    };
    fetchQuestions();
    fetchTextbooks();
  }, [topicID]);

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <Box m={3}></Box>
      <Grid item>
        <Typography variant="h2">Topic</Typography>
      </Grid>
      <Box m={1}></Box>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        <TextBooksExtension textbooks={textbooks} />
        <QuestionExtension questions={questions} />
      </Grid>
    </Grid>
  );
}
