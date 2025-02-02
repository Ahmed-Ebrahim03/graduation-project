import express, { Router } from "express";
import userController from "../controllers/userController";
import { authUser } from "../middlewares/AuthUser";

const router: Router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.get("/me", authUser, userController.authUser);

export default router;
