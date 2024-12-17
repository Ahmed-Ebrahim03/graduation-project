import { Request, Response, NextFunction } from 'express';
import env from '../config/env';
import asyncHandler from 'express-async-handler';
import Summary from '../models/summary';
import zod from "zod"

type QuestionsControllers = {
    generateQuestoins: (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
};

// zod shema for createQuestions
const createQuestionsSchema = zod.object({
    summaryId: zod.string(),
    number: zod.number()
})

const quesitonsControllers: QuestionsControllers = {
    generateQuestoins: asyncHandler(async (req: Request, res: Response) => {
        const { summaryId, number } = req.body;

        // validate the request body
        const { success } = createQuestionsSchema.safeParse(req.body);
        if (!success) {
            res.status(400);
            throw new Error('Invalid request body');
        }

        const text = await Summary.findById(summaryId);
        const url = env.AI_SERVICE_URL + '/questions';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, number })
        });
        const questions = await response.json();
        await Summary.findByIdAndUpdate(summaryId, { questions });
        
        res.status(200).json({
            questions
        })
    })
}

export default quesitonsControllers;