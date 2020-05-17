import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from './utils/history';
import { useAuth0 } from "./helpers/react-auth0-spa";
import Topic from "./components/Topic";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TopicSelection from "./components/TopicSelection";
import Spinner from './components/Spinner';

export default function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Router history={history}>
        <header>
          <Navbar />
        </header>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/topics" exact component={TopicSelection}></Route>
          <Route path="/topic/:topicId" exact component={Topic}></Route>
        </Switch>
      </Router>
    </div>
  );
}
