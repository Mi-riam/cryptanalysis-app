import { Router } from "express";
import { hashPassword } from "../controllers/hash-password.controller";
import { timeoutMiddleware } from "../middlewares/timeout.middleware";

const router = Router();

router.use(timeoutMiddleware);
router.post("/hash-password", hashPassword);

export default router;
