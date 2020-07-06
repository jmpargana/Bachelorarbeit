import React, { createContext, useReducer } from "react";
import TopicReducer from './reducer';

const TopicContext = createContext({});

function TopicProvider(props) {
  const [state, dispatch] = useReducer(TopicReducer, {})
  return (
    <TopicContext.Provider 
      value={{ state, dispatch }}
    >
      {props.children}
    </TopicContext.Provider>
  );
}

export { TopicProvider, TopicContext };
