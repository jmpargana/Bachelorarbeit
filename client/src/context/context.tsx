import React, { createContext, useReducer, useEffect } from "react";
import {TopicReducer, Action, State } from './reducer';

const initialState: State = JSON.parse(localStorage.getItem('topic') || '{}');
const TopicContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null
});


const TopicProvider: React.ComponentType = ({children}) => {
  const [state, dispatch] = useReducer(TopicReducer, initialState)

  useEffect(() => {
    localStorage.setItem('topic', JSON.stringify(state))
  }, [state]);

  return (
      <TopicContext.Provider value={{state, dispatch}}>
        {children}
      </TopicContext.Provider>
  );
}

export { TopicProvider, TopicContext };
