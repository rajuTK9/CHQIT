import express, { Request, Response } from "express";
import userController from "../controllers/user.controller";
const router = express.Router();

router.get("/detail", userController.getDetail);

export default router;
