import React, { useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextBooksExtension from "./TextBooksExtension";
import QuestionExtension from "./QuestionExtension";
import Textbook from "../models/Textbook";
import Question from "../models/Question";
import axios from "axios";
import {TopicContext} from "../context/context";

const questionAPI: string = "https://alexastudyingassistant.herokuapp.com/api/questions/";
const textbookAPI: string = "https://alexastudyingassistant.herokuapp.com/api/textbooks/";

export default function Topic() {
  const { state, dispatch } = useContext(TopicContext);
  const location = useLocation();
  const topicID = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await axios(questionAPI + topicID);
      if (Object.keys(state).length !== 0 && result.data) {
        result.data.map((question: Question) => 
          dispatch({type: 'UPLOAD_QUESTION', topicId: topicID, question})
        );
      }
    };
    const fetchTextbooks = async () => {
      const result = await axios(textbookAPI + topicID);
      if (Object.keys(state).length !== 0 && result.data){
        result.data.map((textbook: Textbook) => 
          dispatch({type: 'UPLOAD_TEXTBOOK', topicId: topicID, textbook})
        );
      }
    };
    dispatch({type: 'CLEAN', topicId: topicID})
    fetchQuestions();
    fetchTextbooks();
  }, [topicID]);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Box m={3}></Box>
      <Grid item>
        <Typography variant="h2">{state[topicID] ? state[topicID].topic.name : "Topic"}</Typography>
      </Grid>
      <Box m={1}></Box>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        <TextBooksExtension />
        <QuestionExtension />
      </Grid>
    </Grid>
  );
}
