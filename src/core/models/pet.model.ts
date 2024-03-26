import { ObjectId } from "mongodb";

export interface Pet {
  _id?: ObjectId;
  name: string;
  breed: string | null;
  birthdate: Date;
  ownerId: ObjectId; // user id
  createdAt?: Date;
  updatedAt?: Date;
}
