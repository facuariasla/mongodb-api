import { NextFunction, Request, Response } from "express";
import { GenericError } from "../../infraestructure/error.model";
import { PetService } from "../../core/services/pet.service";
import { Pet } from "../../core/models/pet.model";

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
