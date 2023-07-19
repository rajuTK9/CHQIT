import express, { Request, Response } from "express";
import checklistController from "../controllers/checklist.controller";
const router = express.Router();

router.post("/add", checklistController.addTask);
router.get("/get", checklistController.getTasks);
router.patch("/update/:id", checklistController.updateTask);
router.patch("/markDone/:id", checklistController.updateIsDone);
router.delete("/delete/:id", checklistController.removeTask);

export default router;
