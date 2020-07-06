import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Box from "@material-ui/core/Box";
import Textbook from "../models/Textbook";
import Divider from '@material-ui/core/Divider';
import CreateNewTextbook from './CreateNewTextbook';
import {TopicContext} from "../context/context";
import {useLocation} from "react-router-dom";

export default function TextBooksExtension(props: {
  textbooks: Array<Textbook>;
}) {
  const [expanded, setExpanded] = React.useState("");
  const { state } = useContext(TopicContext);
  const location = useLocation();
  const topicID = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : "");
  };

  return (
    <Grid item xs={12} sm={6}>
      <Box m={2}></Box>
      <Typography variant="h3">Textbooks</Typography>
      <Box m={2}></Box>
      <CreateNewTextbook />
      <Box m={2}></Box>
      {state[topicID] ? state[topicID].textbooks.map((text, index) => (
        <ExpansionPanel
          expanded={expanded === `panel${index}`}
          key={`panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" display="block">{text.title}</Typography>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails>
            <Typography variant='body1' style={{whiteSpace: "pre-line"}}>{text.body}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )) : null}
    </Grid>
  );
}
