import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../core/models/user.model";

export default class JwtUtils {
  public static async setNewAccessToken(user: User): Promise<any> {
    const accessToken: string = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        type: "access",
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRATION_TIME
          ? process.env.JWT_EXPIRATION_TIME
          : "1d",
      }
    );
    const decoded: any = jwt.verify(accessToken, process.env.JWT_SECRET as string);
    return { id: user._id, accessToken, expiration: decoded.exp };
  }
}
