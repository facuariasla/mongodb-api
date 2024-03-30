import os from "os";

import { Router } from "express";
import UserRoutes from "./user.routes";
import AuthRoutes from "./auth.routes";
import PetRoutes from "./pet.routes";
const router: Router = Router();

router.get("/", (req, res, next) => {
  res.json({
    status: "API Pets",
    version: "v1",
  });
});

const cpuUsage = os.loadavg();
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
router.use("/health", (req, res, next) =>
  res.json({
    status: "API V1",
    version: "v1",
    cpuUsage: `${cpuUsage} bytes`,
    totalMemory: `${totalMemory} bytes`,
    freeMemory: `${freeMemory} bytes`,
  })
);

router.use("/users", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/pets", PetRoutes);

export default router;
