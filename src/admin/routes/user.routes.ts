import { Router } from "express";
import { AuthenticationMiddleware } from "../../middleware/authentication.middleware";
import { UserController } from "../controller/user.controller";
const router: Router = Router();

router.get(
  "/",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("user", "readAny"),
  UserController.getAll
);
router.put(
  "/:userId",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("user", "updateAny"),
  UserController.update
);
router.delete(
  "/:userId",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("user", "deleteAny"),
  UserController.delete
);

export default router;
