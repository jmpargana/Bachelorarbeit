import React, { createContext, useReducer } from 'react';
import Topic from '../models/Topic';
import Question from '../models/Question';
import Textbook from '../models/Textbook';
/* import topicReducer from './reducer'; */

type TopicContextType = {
  [topicId: string]: {
    topic: Topic,
    questions: Question[],
    textbooks: Textbook[],
  };
}

const AppContext = createContext<{
  state: TopicContextType;
  dispatch: React.Dispatch<any>;
}>({
  state: {},
  dispatch: () => null
});

export { AppContext };
