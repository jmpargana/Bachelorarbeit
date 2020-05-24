export default interface Question {
  _id: string | undefined;
  question: string;
  answers: Array<string>;
  correct: number;
}