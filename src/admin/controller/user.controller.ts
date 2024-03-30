import { NextFunction, Request, Response } from "express";
import { User } from "../../core/models/user.model";
import { GenericError } from "../../infraestructure/error.model";
import { UserService } from "../../core/services/user.service";

export class UserController{
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body: User = req.body;
      if (!body.email || !body.name || !body.surname || !body.password)
        throw GenericError.REQUIRED_DATA;
      const data = await UserService.create(body);
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
          $or: [
            { name: { $regex: req.query.search as string, $options: "i" } },
            { surname: { $regex: req.query.search as string, $options: "i" } },
            { email: { $regex: req.query.search as string, $options: "i" } },
          ],
        };
      }
      const data = await UserService.getAll(
        page,
        limit,
        order,
        orderBy,
        search
      );
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
      const id = req.params.userId;
      const body: Partial<User> = req.body;
      const data = await UserService.update(id, body);
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
      const id = req.params.userId;
      const data = await UserService.delete(id);
      res.status(202).json({ status: "ok", data });
    } catch (error) {
      next(error);
    }
  }

}