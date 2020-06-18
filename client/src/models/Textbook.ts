
import {ObjectID} from 'mongodb';

export default interface Textbook {
  _id: ObjectID;
  title: string,
  body: string,
  userEmail: string,
  topicID: ObjectID,
}
