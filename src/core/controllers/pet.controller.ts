import { Request, Response, NextFunction } from "express";
import { Pet } from "../models/pet.model";
import { GenericError } from "../../infraestructure/error.model";
import { PetService } from "../services/pet.service";
import { ObjectId } from "mongodb";
export class PetController {
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body: Pet = req.body;
      if (!body.name || !body.birthdate || !body.ownerId)
        throw GenericError.REQUIRED_DATA;
      const data = await PetService.create(body);
      res.status(201).json({ status: "ok", data });
    } catch (error) {
      next(error);
    }
  }

  public static async createOwn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId: string = res.locals.loggedInUser._id;
      if (!userId) throw GenericError.AUTH_ERROR;
      const _id: ObjectId = new ObjectId(userId);
      let body: Pet = req.body;
      body.ownerId = _id;
      if (!body.name || !body.birthdate) throw GenericError.REQUIRED_DATA;
      const data = await PetService.create(body);
      res.status(201).json({ status: "ok", data });
    } catch (error) {
      next(error);
    }
  }

  public static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const orderBy = req.query.orderBy
        ? (req.query.orderBy as string)
        : "createdAt";
      const order = req.query.order ? (req.query.order === "asc" ? 1 : -1) : -1;
      let search = {};
      if (req.query.search) {
        search = {
          name: { $regex: req.query.search as string, $options: "i" },
        };
      }

      const data = await PetService.getAll(page, limit, order, orderBy, search);
      res.status(200).json({ status: "ok", data });
    } catch (error) {
      next(error);
    }
  }

  public static async allMyPets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = res.locals.loggedInUser._id;
      if (!userId) throw GenericError.AUTH_ERROR;
      const _id: ObjectId = new ObjectId(userId);
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const orderBy = req.query.orderBy
        ? (req.query.orderBy as string)
        : "createdAt";
      const order = req.query.order ? (req.query.order === "asc" ? 1 : -1) : -1;
      let search = {};
      if (req.query.search) {
        search = {
          name: { $regex: req.query.search as string, $options: "i" },
        };
      }
      if (_id) {
        search = { ...search, ownerId: _id };
      }
      const data = await PetService.getAll(page, limit, order, orderBy, search);
      res.status(200).json({ status: "ok", data });
    } catch (error) {
      next(error);
    }
  }
  
  public static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body: Pet = req.body;
      const id = req.params.petId;
      const data = await PetService.update(id, body);
      res.status(200).json({ status: "ok", data });
    } catch (error) {
      next(error);
    }
  }

  public static async updateOwn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body: Pet = req.body;
      const id = req.params.petId;
      const userId = res.locals.loggedInUser._id;

      const pet = await PetService.getById(id);
      if (pet.ownerId !== userId) {
        throw GenericError.DATA_MODIFICATION;
      }

      const data = await PetService.update(id, body);
      res.status(200).json({ status: "ok", data });
    } catch (error) {
      next(error);
    }
  }

  public static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.petId;
      const data = await PetService.delete(id);
      res.status(200).json({ status: "ok", data });
    } catch (error) {
      next(error);
    }
  }
}
