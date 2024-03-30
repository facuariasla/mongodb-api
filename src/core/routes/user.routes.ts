import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthenticationMiddleware } from "../../middleware/authentication.middleware";
const router: Router = Router();

//! subscriber routes
router.post("/", UserController.create);
router.put(
  "/:userId",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("user", "update"),
  UserController.updateMyProfile
);
router.get(
  "/myprofile",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("user", "read"),
  UserController.myProfile
);

export default router;
