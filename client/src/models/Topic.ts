import Textbook from './Textbook';
import Question from './Question';

export default interface Topic {
  _id: string | undefined;
  name: string;
  // textbooks: Array<Textbook>;
  // questions: Array<Question>;
}
