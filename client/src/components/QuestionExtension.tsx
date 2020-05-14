import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Box from '@material-ui/core/Box';

interface Question {
  question: string;
  answers: Array<string>;
  correct: number;
}

export default function QuestionExtension(props: { questions: Array<Question>}) {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : "");
  }

  return (
        <Grid item>
          <Typography variant="h3">Textbooks</Typography>
          <Box m={3}></Box>
          {props.questions.map((question, index) => (
            <ExpansionPanel expanded={expanded === `panelQuestion${index}`} key={`panelQuestion${index}`} onChange={handleChange(`panelQuestion${index}`)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">{question.question}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {question.answers.map((answer, indexAnswer) => (
                  <Typography key={`question${index}answer${indexAnswer}`}>{answer}</Typography>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Grid>
    );
}