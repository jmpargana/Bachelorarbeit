import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import history from './utils/history';
import {useAuth0} from "./helpers/react-auth0-spa";
import Topic from "./components/Topic";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TopicSelection from "./components/TopicSelection";
import Spinner from './components/Spinner';
import PrivateRoute from './components/PrivateRoute';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './styles';
import {TopicProvider} from "./context/context";

export default function App() {
  const {loading} = useAuth0();

  if (loading) {
    return <Spinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      <TopicProvider>
        <Router history={history}>
          <header>
            <Navbar />
          </header>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <PrivateRoute path="/topics" component={TopicSelection} />
            <PrivateRoute path="/topic/:topicId" component={Topic} />
          </Switch>
        </Router>
      </TopicProvider>
    </ThemeProvider>
  );
}
