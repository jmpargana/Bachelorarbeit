import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Topic from "./components/Topic";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UploadQuestion from "./components/UploadQuestion";
import TopicSelection from './components/TopicSelection';

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/topics" exact component={TopicSelection}></Route>
          <Route path="/topic/:topicId" exact component={Topic}></Route>
          <Route path="/upload-question" exact component={UploadQuestion}></Route>
        </Switch>
      </div>
    </Router>
  );
}
