import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  name: string;
  surname: string;
  email: string;
  role: "admin" | "subscriber";
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
