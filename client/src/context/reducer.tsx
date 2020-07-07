import Topic from "../models/Topic";
import Textbook from "../models/Textbook";
import Question from "../models/Question";

export interface FullTopic {
  topic: Topic;
  questions: Question[];
  textbooks: Textbook[];
}

export type State = {
  [key: string]: FullTopic;
};

export type Action = 
  | { type: "UPLOAD_TOPIC"; topic: Topic }
  | { type: "UPLOAD_QUESTION"; topicId: string; question: Question }
  | { type: "UPLOAD_TEXTBOOK"; topicId: string; textbook: Textbook }
  | { type: "CLEAN"; topicId: string };


export function TopicReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPLOAD_TOPIC': {
      return {
        ...state, 
        [action.topic._id.toString()]: {
          topic: action.topic,
          questions: [],
          textbooks: [],
        },
      };
    }
    case "UPLOAD_QUESTION": {
      return { 
        ...state,  
        [action.topicId]: {
          ...state[action.topicId],
          questions: [
            ...state[action.topicId].questions,
            action.question,
          ]
        }
      };
    }
    case "UPLOAD_TEXTBOOK": {
      return { 
        ...state,  
        [action.topicId]: {
          ...state[action.topicId],
          textbooks: [
            ...state[action.topicId].textbooks,
            action.textbook,
          ]
        }
      };
    }
    case "CLEAN": {
      localStorage.removeItem('topic')
      return {
        ...state,
        [action.topicId]: {
          topic: state[action.topicId].topic,
          questions: [],
          textbooks: [],
        }
      }
    }
    default:
      return state;
  }
}
