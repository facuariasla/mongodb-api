import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthenticationMiddleware } from "../../middleware/authentication.middleware";
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

//! subscriber routes
router.post("/", UserController.create);
router.put(
  "/profile/:userId",
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
