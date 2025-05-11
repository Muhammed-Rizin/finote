import { Router } from "express";

import auth from "../middleware/pesAuth.js";
import * as controller from "../controller/pes.controller.js";

const router = Router();

router.use(auth);

router.get("/team", controller.teams);
router.post("/team", controller.createTeam);

router.get("/match", controller.matches);
router.post("/match", controller.createMatch);

router.get("/dashboard", controller.dashboardDetails);

router.get("/options/user", controller.userOptions)
router.get("/options/team", controller.teamOptions)

export default router;
