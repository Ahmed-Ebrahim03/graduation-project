// check token in header
import jwt from "jsonwebtoken";
import env from "../config/env";
import { Request, Response, NextFunction, RequestHandler } from "express";
import User, { IUser } from "../models/user";
import asyncHandler from "express-async-handler";

export const authUser: RequestHandler = asyncHandler(async (req: Request & { user?: IUser }, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || req.headers.token;

    if (!token || typeof token !== 'string') {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    try {
        // const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
        if (!decoded || typeof decoded.id !== 'string') {
            throw new Error("Invalid token");
        }
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }

        req.user = user.toObject() as IUser;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
});