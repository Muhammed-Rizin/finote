import { Router } from "express";

import * as controller from "../controller/auth.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);

router.put("/refreshToken", controller.refreshToken);

router.delete("/logout", auth, controller.logout);

router.post("/pes/login", controller.pesLogin);
router.put("/pes/refreshToken", controller.pesRefreshToken);

export default router;
