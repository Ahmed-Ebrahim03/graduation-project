import asyncHandler from "express-async-handler";
import Summary, { ISummary } from "../models/summary";
import { NextFunction, Request, Response } from "express";
import zod from "zod";
import multer from "multer";
import PdfParse from "pdf-parse";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const summaryController = {
    createSummary: [
        upload.single('file'),
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            const file = req.file;
            if (!file) {
                res.status(400);
                throw new Error('No file uploaded');
            }
            const fileType = file.mimetype;
            let text = '';

            if (fileType == 'application/pdf') {
                const text = await PdfParse(file.buffer);
            } else if (fileType == 'text/plain') {
                text = file.buffer.toString();
            } else {
                res.status(400);
                throw new Error('Invalid file type');
            }

            // 1. Call summary Service
            const url = process.env.AI_SERVICE_URL + '/summarize';
            const summary = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            })
            // 2. Response with the Summary
            res.status(200).json({
                summary
            })
        })
    ],
}