import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthenticationMiddleware } from "../../middleware/authentication.middleware";
const router: Router = Router();

router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.put("/:userId", UserController.update);
router.delete(
  "/:userId",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("user", "deleteAny"),
  UserController.delete
);

export default router;
