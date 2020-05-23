export default interface Question {
  _id: string;
  question: string;
  answers: Array<string>;
  correct: number;
}