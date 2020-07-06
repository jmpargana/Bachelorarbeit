import React, { useContext} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Box from "@material-ui/core/Box";
import Question from "../models/Question";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckIcon from '@material-ui/icons/Check';
import CreateNewQuestion from "./CreateNewQuestion";
import {TopicContext} from "../context/context";
import {useLocation} from "react-router-dom";

export default function QuestionExtension(props: {
  questions: Array<Question>;
}) {
  const [expanded, setExpanded] = React.useState("");
  const { state } = useContext(TopicContext);
  const location = useLocation();
  const topicID = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

  /* console.log({state, topicID}) */

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : "");
  };

  return (
    <Grid item xs={12} sm={4}>
      <Box m={2}></Box>
      <Typography variant="h3">Questions</Typography>
      <Box m={2}></Box>
      <CreateNewQuestion />
      <Box m={2}></Box>
      {state[topicID] ? state[topicID].questions.map((question, index) => (
        <ExpansionPanel
          expanded={expanded === `panelQuestion${index}`}
          key={`panelQuestion${index}`}
          onChange={handleChange(`panelQuestion${index}`)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{question.question}</Typography>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails>
            <List>
              {question.answers.map((answer, indexAnswer) => (
                <ListItem key={`question-${index}-answer-${indexAnswer}`}>
                  <ListItemIcon>{question.correct === indexAnswer ? <CheckIcon /> : null}</ListItemIcon>
                  <ListItemText primary={answer} />
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )) : null}
    </Grid>
  );
}
