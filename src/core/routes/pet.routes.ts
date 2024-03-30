import { Router } from "express";
import { PetController } from "../controllers/pet.controller";
import { AuthenticationMiddleware } from "../../middleware/authentication.middleware";

const router: Router = Router();

// ! subscribers routes:
router.post(
  "/",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("pet", "create"),
  PetController.createOwn
);

router.get(
  "/",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("pet", "read"),
  PetController.allMyPets
);
router.put(
  "/:petId",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("pet", "update"),
  PetController.updateOwn
);
// you can add more routes here

export default router;
