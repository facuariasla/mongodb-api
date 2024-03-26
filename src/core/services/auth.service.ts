import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { user_collection } from "./user.service";
import { GenericError } from "../../infraestructure/error.model";
import JwtUtils from "../../utils/jwt.utils";
export class AuthService {
  public static async login(email: string, password: string): Promise<User> {
    const _email = email.trim().toLowerCase();
    const doc = await user_collection.findOne({ email: _email });
    if (!doc) throw GenericError.WRONG_EMAIL_OR_PASSWORD;
    const validPassword = bcrypt.compareSync(password, doc.password);
    if (!validPassword) throw GenericError.WRONG_EMAIL_OR_PASSWORD;
    const user = doc as User;
    const data: any = await JwtUtils.setNewAccessToken(user);
    delete doc.password;
    return { ...data, ...user };
  }
}
