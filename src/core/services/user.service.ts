import {
  InsertOneResult,
  ObjectId,
  UpdateResult,
  Document,
  SortDirection,
  Sort,
} from "mongodb";
import mongoDB from "../../infraestructure/database/mongodb/mongo";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { GenericError } from "../../infraestructure/error.model";
export const user_collection = mongoDB.collection("users");
export class UserService {
  public static async create(data: User): Promise<User> {
    const email = data.email.trim().toLowerCase();
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // valid emails
    const validEmail: boolean = emailRegex.test(email);
    if (!validEmail) throw GenericError.INVALID_EMAIL;
    const exists = await user_collection.findOne({ email });
    if (exists) throw GenericError.ALREADY_EXISTS;
    //hash pasword
    const hashedPass = bcrypt.hashSync(data.password, 10);
    data.password = hashedPass;

    const now = new Date();
    data = {
      ...data,
      name: data.name.trim(),
      surname: data.surname.trim(),
      email,
      createdAt: now,
      updatedAt: now,
    };
    const res: InsertOneResult<User> = await user_collection.insertOne(data);
    if (res) {
      const user = await user_collection.findOne({ _id: res.insertedId });
      if (user) {
        return user as User;
      }
    }
    throw GenericError.SERVER_ERROR;
  }
  public static async getAll(
    page: number,
    limit: number,
    order: SortDirection = 1,
    orderBy: Sort,
    search: {}
  ): Promise<any> {
    const skip = (page - 1) * limit;

    const res = await user_collection
      .find(search)
      .sort(orderBy, order)
      .skip(skip)
      .limit(limit)
      .toArray();

    return {
      page,
      limit,
      data: res,
    };
  }
  public static async update(id: string, data: Partial<User>): Promise<User> {
    const now = new Date();
    data = {
      ...data,
      updatedAt: now,
    };
    const _id = new ObjectId(id);
    const res: UpdateResult<Document> = await user_collection.updateOne(
      { _id },
      { $set: data }
    );
    if (res.modifiedCount === 1) {
      // Si se actualizó correctamente, obtén y devuelve el usuario actualizado
      const updatedUser = await user_collection.findOne({ _id });
      if (updatedUser) {
        return updatedUser as User;
      }
    }
    throw GenericError.NOT_FOUND;
  }

  public static async getById(id: string): Promise<User> {
    const _id = new ObjectId(id);
    // Si se actualizó correctamente, obtén y devuelve el usuario actualizado
    const user = await user_collection.findOne({ _id });
    if (user) {
      return user as User;
    }

    throw GenericError.NOT_FOUND;
  }

  public static async delete(id: string): Promise<number> {
    const _id = new ObjectId(id);
    const res = await user_collection.deleteOne({ _id });
    if (res.deletedCount > 0) {
      return res.deletedCount;
    }
    throw GenericError.NOT_FOUND;
  }
}
