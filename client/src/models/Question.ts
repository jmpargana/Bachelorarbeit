import {ObjectID} from 'mongodb';

export default interface Question {
  _id: ObjectID;
  question: string;
  userEmail: string;
  answers: Array<string>;
  correct: number;
  topicID: ObjectID;
}