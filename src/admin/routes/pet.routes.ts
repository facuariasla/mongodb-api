import { Router } from "express";
import { AuthenticationMiddleware } from "../../middleware/authentication.middleware";
import { PetController } from "../controller/pet.controller";

const router: Router = Router();

router.get(
  "/",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("pet", "readAny"),
  PetController.getAll
);
router.post(
  "/",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("pet", "createAny"),
  PetController.create
);
router.put(
  "/:petId",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("pet", "updateAny"),
  PetController.update
);
router.delete(
  "/:petId",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("pet", "deleteAny"),
  PetController.delete
);

export default router;
