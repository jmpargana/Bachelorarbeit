import Textbook from './Textbook';
import Question from './Question';

export default interface Topic {
  textbooks: Array<Textbook>;
  questions: Array<Question>;
}
