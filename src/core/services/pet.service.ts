import {
  InsertOneResult,
  ObjectId,
  Sort,
  SortDirection,
  UpdateResult,
} from "mongodb";
import mongoDB from "../../infraestructure/database/mongodb/mongo";
import { Pet } from "../models/pet.model";
import { GenericError } from "../../infraestructure/error.model";

export const pet_collection = mongoDB.collection("pets");

export class PetService {
  public static async create(data: Pet): Promise<Pet> {
    const now = new Date();
    if (new Date(data.birthdate) > now) {
      throw GenericError.INVALID_DATE;
    }
    data = {
      ...data,
      name: data.name.trim(),
      breed: data.breed ? data.breed.trim() : null,
      createdAt: now,
      updatedAt: now,
    };
    const res: InsertOneResult<Pet> = await pet_collection.insertOne(data);
    if (res) {
      const user = await pet_collection.findOne({ _id: res.insertedId });
      if (user) {
        return user as Pet;
      }
    }
    throw GenericError.SERVER_ERROR;
  }
  public static async getAll(
    page: number,
    limit: number,
    order: SortDirection = 1,
    orderBy: Sort,
    search: {},
  ): Promise<any> {

    const skip = (page - 1) * limit;

    const res = await pet_collection
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
  public static async update(id: string, data: Partial<Pet>): Promise<Pet> {
    const now = new Date();
    data = {
      ...data,
      updatedAt: now,
    };
    const _id = new ObjectId(id);
    const res: UpdateResult<Document> = await pet_collection.updateOne(
      { _id },
      { $set: data }
    );
    if (res.modifiedCount === 1) {
      // Si se actualizó correctamente, obtén y devuelve el usuario actualizado
      const updatedUser = await pet_collection.findOne({ _id });
      if (updatedUser) {
        return updatedUser as Pet;
      }
    }
    throw GenericError.NOT_FOUND;
  }
  public static async delete(id: string): Promise<number> {
    const _id = new ObjectId(id);
    const res = await pet_collection.deleteOne({ _id });
    if (res.deletedCount > 0) {
      return res.deletedCount;
    }
    throw GenericError.NOT_FOUND;
  }

  public static async getById(id: string): Promise<Pet> {
    const _id = new ObjectId(id);
    const updatedUser = await pet_collection.findOne({ _id });
    if (updatedUser) {
      return updatedUser as Pet;
    }
    throw GenericError.NOT_FOUND;
  }
}
