import { Request, Response, NextFunction } from "express";
import { GenericError } from "../../infraestructure/error.model";
import { AuthService } from "../services/auth.service";

export class AuthController {
  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const body = req.body;
      if (!body.email || !body.password) throw GenericError.REQUIRED_DATA;
      const data = await AuthService.login(body.email, body.password);
      res.status(200).json({ status: "ok", data });
    } catch (error) {
      next(error);
    }
  }
}
