import { Router } from "express";
import QuestionsController from "../controllers/questionsControllers"
import { authUser } from "../middlewares/AuthUser"

const router: Router = Router()

/* 
    POST /questions -> create a new questions 
    Params: {
        summaryId: string,
        number: number, // number of questions
    }
    Response: {
        questions: string[]
    }
*/

router.post("/", authUser, QuestionsController.generateQuestoins);

// GET /questions/:id -> get a question by id
// router.get("/:id", QuestionsController.getQuestions);

export default router