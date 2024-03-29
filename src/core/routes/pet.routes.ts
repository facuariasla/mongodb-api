import { Router } from "express";
import { PetController } from "../controllers/pet.controller";
import { AuthenticationMiddleware } from "../../middleware/authentication.middleware";

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
// ! subscribers routes:
router.post(
  "/mypets",
  AuthenticationMiddleware.allowIfLoggedIn,
  PetController.createOwn
);

router.get(
  "/mypets/all",
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
