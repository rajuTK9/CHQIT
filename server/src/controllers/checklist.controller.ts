import { Request, Response } from "express";
import checklistService from "../services/checklist.service";

const addTask = async (req: Request, res: Response) => {
  const { id } = res.locals.user;
  const task: string = req.body.task;
  const data = await checklistService.addTask(task, id);
  res.status(200).send({
    success: true,
    message: "Task created successfully.",
    // data,
  });
};

const getTasks = async (req: Request, res: Response) => {
  const { id } = res.locals.user;
  const data = await checklistService.getTasks(id);
  res.status(200).send({
    success: true,
    message: "Tasks fetched successfully.",
    data,
  });
};

const updateTask = async (req: Request, res: Response) => {
  const { id } = res.locals.user;
  const task: string = req.body.task;
  const taskId: number = Number(req.params.id);
  const data = await checklistService.updateTask(task, taskId, id);
  res.status(200).send({
    success: true,
    message: "Task updated successfully.",
    // data,
  });
};

const updateIsDone = async (req: Request, res: Response) => {
  const { id } = res.locals.user;
  const taskId: number = Number(req.params.id);
  const isDone: boolean = req.body.isDone;
  const data = await checklistService.updateIsDone(isDone, taskId, id);
  res.status(200).send({
    success: true,
    message: `Task marked ${isDone ? "done" : "undone"} successfully.`,
    // data,
  });
};

const removeTask = async (req: Request, res: Response) => {
  const { id } = res.locals.user;
  const taskId: number = Number(req.params.id);
  const data = await checklistService.removeTask(taskId, id);
  res.status(200).send({
    success: true,
    message: "Task deleted successfully.",
    // data,
  });
};

export default {
  addTask,
  getTasks,
  updateTask,
  updateIsDone,
  removeTask,
};
