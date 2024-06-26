import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import { GenericError } from "../../infraestructure/error.model";

export class UserController {
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let body: User = req.body;
      if (!body.email || !body.name || !body.surname || !body.password)
        throw GenericError.REQUIRED_DATA;
      body.role = "subscriber";
      const data = await UserService.create(body);
      res.status(201).json({ status: "ok", data });
    } catch (error) {
      next(error);
    }
  }

  public static async updateMyProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = res.locals.loggedInUser._id;
      if (!userId) throw GenericError.AUTH_ERROR;
      const body: Partial<User> = req.body;
      const data = await UserService.update(userId, body);
      res.status(200).json({ status: "ok", data });
    } catch (error) {
      next(error);
    }
  }

  public static async myProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = res.locals.loggedInUser._id;
      const data = await UserService.getById(id);
      res.status(202).json({ status: "ok", data });
    } catch (error) {
      next(error);
    }
  }
}
