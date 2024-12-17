import express, { Router } from "express";
import { authUser } from "../middlewares/AuthUser";
import summaryController from "../controllers/summaryController";

const router: Router = express.Router();


// POST /summary -> create a new summary
router.post("/", authUser, summaryController.createSummary);

// GET /summary -> get all summaries
router.get("/:id", authUser, summaryController.getSummary)

// GET /summary/:id -> get a summary by id
router.get("/", authUser, summaryController.getAllSummaries)

export default router;
