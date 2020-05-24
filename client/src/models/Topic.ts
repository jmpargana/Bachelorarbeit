// import Textbook from './Textbook';
// import Question from './Question';
import {ObjectID} from 'mongodb';

export default interface Topic {
  _id: ObjectID;
  name: string;
  // textbooks: Array<Textbook>;
  // questions: Array<Question>;
}
