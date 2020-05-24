import {ObjectID} from 'mongodb';

export default interface Question {
  _id: ObjectID;
  question: string;
  userID: ObjectID;
  answers: Array<string>;
  correct: number;
  topicID: ObjectID;
}