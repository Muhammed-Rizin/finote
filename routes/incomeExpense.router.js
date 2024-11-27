import { Router } from "express";
import auth from "../middleware/auth.js";
import * as controller from "../controller/incomeExpense.controller.js";

const router = Router();

router.use(auth);

router.get("/", controller.list);
router.post("/", controller.create);
router.patch("/", controller.update);
router.delete("/", controller.del);

export default router;
