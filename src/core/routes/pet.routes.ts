import { Router } from "express";
import { PetController } from "../controllers/pet.controller";
import { AuthenticationMiddleware } from "../../middleware/authentication.middleware";

const router: Router = Router();

router.get("/", PetController.getAll);
router.put(
  "/:petId",
  AuthenticationMiddleware.allowIfLoggedIn,
  AuthenticationMiddleware.grantAccess("pet", "update"),
  PetController.update
);

export default router;
