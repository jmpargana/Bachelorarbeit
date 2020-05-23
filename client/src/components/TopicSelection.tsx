import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CreateTopic from "./CreateTopic";
import Topic from '../models/Topic';
import axios from "axios";

const topicAPI = "http://localhost:8080/api/topics";

// TODO: This will be loaded and uploaded to server
// const topics: Array<string> = ["mathematics", "physics", "computer science"];

export default function TopicSelection() {
  const [topics, setTopics] = useState(new Array<string>());
  const history = useHistory();
  const value = "";

  useEffect(() => {
    const fetchTopics = async () => {
      const result = await axios(topicAPI);
      result.data.map((topic: Topic) => setTopics(oldTopics => [...oldTopics, topic["name"]]))
    };
    fetchTopics();
  }, []);

  function handleRoute(route: string) {
    history.push(`/topic/${route}`);
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid item>
        <Typography variant="h4">Create or join a topic:</Typography>
      </Grid>
      <Box m={2}></Box>
      <Grid item style={{ width: 300 }}>
        <Autocomplete
          value={value}
          onChange={(event: any, newValue: any) =>
            newValue ? handleRoute(newValue) : null
          }
          options={topics}
          getOptionLabel={(option: string) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Topic name"
              variant="outlined"
            ></TextField>
          )}
        />
      </Grid>
      <Box m={2}></Box>
      <Grid item>
        <CreateTopic />
      </Grid>
    </Grid>
  );
}
