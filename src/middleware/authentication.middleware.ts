import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { GenericError } from "../infraestructure/error.model";
import jwt from "jsonwebtoken";

const roleAccess:any = {
  admin: {
    user: ['createAny', 'readAny', 'updateAny', 'deleteAny'],
    pet: ['createAny', 'readAny', 'updateAny', 'deleteAny'],
  },
  subscriber: {
    user: ['read', 'update'],
    pet: ['create', 'read', 'update', 'delete'],
  },
}
export class AuthenticationMiddleware {
  public static async accessControl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.headers.authorization;

      if (accessToken) {
        if (!accessToken.startsWith("Bearer ")) {
          return next(GenericError.TOKEN_ERROR);
        }
        const token = accessToken.slice(7, accessToken.length);
        try {
          const tokenData: any = jwt.verify(
            token,
            process.env.JWT_SECRET as string
          );
          res.locals.loggedInUser = {
            _id: tokenData.userId,
            role: tokenData.role,
            email: tokenData.email,
          };
          next();
        } catch (error: any) {
          next(GenericError.TOKEN_ERROR);
        }
      } else {
        // Just pass if no auth token provided
        next();
      }
    } catch (error: any) {
      if (error instanceof jwt.TokenExpiredError) {
        next(GenericError.TOKEN_ERROR);
      }
      next(error);
    }
  }
  public static async allowIfLoggedIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = res.locals.loggedInUser;
      if (user) {
        next();
      } else {
        next(GenericError.AUTH_ERROR);
      }
    } catch (error: any) {
      next(error);
    }
  }

  public static grantAccess = (
    resource: string,
    action: string
  ): ((req: Request, res: Response, next: NextFunction) => void) => {
    // The action should be create, read, update or delete
    // The resource should be those actions targets, such as our plataform subscribers
    // or Marketplace service providers, for example
    return (req: Request, res: Response, next: NextFunction) => {
      const access = roleAccess[res.locals.loggedInUser.role]?.[resource]?.some(
        (element: string) => element === action
      );
      if (access) {
        next();
      } else {
        next(GenericError.ROLE_ERROR);
      }
    };
  };
}
