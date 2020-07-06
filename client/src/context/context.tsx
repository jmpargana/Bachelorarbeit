import React, { createContext, useReducer } from "react";
import {TopicReducer, Action, State } from './reducer';

const initialState: State = {};
const TopicContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null
});

const TopicProvider: React.ComponentType = ({children}) => {
  const [state, dispatch] = useReducer(TopicReducer, initialState)

  return (
      <TopicContext.Provider value={{state, dispatch}}>
        {children}
      </TopicContext.Provider>
  );
}

export { TopicProvider, TopicContext };
