import asyncHandler from "express-async-handler";
import Summary, { ISummary } from "../models/summary";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import PdfParse from "pdf-parse";
import { IUser } from "../models/user";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

type Middleware = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

type SummaryController = {
    createSummary: Middleware[];
    getSummary: Middleware;
    getAllSummaries: Middleware;
};

const summaryController: SummaryController = {
    createSummary: [
        upload.single('file'),
        asyncHandler(async (req: Request & { user?: IUser }, res: Response, next: NextFunction) => {
            const file = req.file;
            if (!file) {
                res.status(400);
                throw new Error('No file uploaded');
            }
            const fileType = file.mimetype;
            const fileName = file.originalname
            let text = '';

            if (fileType == 'application/pdf') {
                const pdfData = await PdfParse(file.buffer);
                text = pdfData.text;
            } else if (fileType == 'text/plain') {
                text = file.buffer.toString();
            } else {
                res.status(400);
                throw new Error('Invalid file type');
            }
            // 1. Call summary Service
            const url = process.env.AI_SERVICE_URL + '/summarize';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });
            const summary = await response.json();

            const newSummary = await Summary.create({ title: fileName, summary: summary.summary, userId: req.user!._id });
            // 2. Response with the Summary
            res.status(200).json({
                id: newSummary._id,
                summary: summary.summary,
            });
        })
    ],

    getSummary: asyncHandler(async (req: Request & { user?: IUser }, res: Response, next: NextFunction) => {
        const summary = await Summary.findById(req.params.id);
        res.status(200).json({
            summary: summary
        });
    }),

    getAllSummaries: asyncHandler(async (req: Request & { user?: IUser }, res: Response, next: NextFunction) => {
        const summarizes = await Summary.find({ userId: req.user!._id });
        // [{ _id, title }]
        console.log(summarizes);
        res.status(200).json({
            summarizes: summarizes
        });
    })
}

export default summaryController;