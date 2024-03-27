import { Router } from "express";
import {PetController} from "../controllers/pet.controller";

const router: Router = Router();

router.get("/", PetController.getAll);

export default router;