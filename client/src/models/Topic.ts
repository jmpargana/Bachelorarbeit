import {ObjectID} from 'mongodb';

export default interface Topic {
  _id: ObjectID;
  name: string;
}
