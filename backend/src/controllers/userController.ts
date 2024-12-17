import asyncHandler from 'express-async-handler'
import { NextFunction, Request, Response } from 'express'
import userService from '../services/userService'
import zod from 'zod'
import jwt from 'jsonwebtoken'
import env from '../config/env'
import { IUser } from '../models/user'

type UserController = {
    signUp: (req: Request, res: Response, next: NextFunction) => void
    logIn: (req: Request, res: Response, next: NextFunction) => void
    authUser: (req: Request, res: Response, next: NextFunction) => void
}

const userSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
    phoneNumber: zod.string()
})

const logInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

const userController: UserController = {
    signUp: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = userSchema.parse(req.body)
        const userExists = await userService.findUserByEmail(user.email)
        if (userExists) {
            res.status(400)
            throw new Error('User already exists')
        }
        const createdUser = await userService.createUser(user)
        res.json({
            message: 'signUp',
            user: createdUser
        })
    }),
    logIn: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = logInSchema.parse(req.body)
        const user = await userService.findUserByEmail(email)
        if (!user) {
            res.status(400)
            throw new Error('User not found')
        }
        if (!(await user.comparePassword(password))) {
            res.status(400)
            throw new Error('Incorrect password')
        }
        const token = jwt.sign({ id: user._id }, env.JWT_SECRET as string, {
            expiresIn: '30d'
        })
        res.status(200).json({
            message: 'logIn',
            user: user,
            token: token
        })
    }),
    authUser: asyncHandler(async (req: Request & {user?: IUser}, res: Response, next: NextFunction) => {
        res.status(200).json({
            message: 'authUser',
            user: req.user
        })
    })
}
export default userController;