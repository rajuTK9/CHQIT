import express, { Request, Response } from "express";
import checklistRouter from "./checklist.router";
import userRouter from "./user.router";
import authRouter from "./auth.router";
import { checkUser } from "../middlewares/auth.middleware";
const router = express.Router();

router.use("/checklist", checkUser, checklistRouter);
router.use("/user", checkUser, userRouter);
router.use("/auth", authRouter);

export default router;
