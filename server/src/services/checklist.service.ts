import Checklist from "../models/checklist.model";

const addTask = async (task: string, id: number) => {
  return await Checklist.create({ task, userId: id });
};

const getTasks = async (id: number) => {
  return await Checklist.findAll({
    where: { userId: id },
    order: [["createdAt", "DESC"]],
  });
};

const updateTask = async (task: string, taskId: number, id: number) => {
  return await Checklist.update(
    { task },
    { where: { id: taskId, userId: id } }
  );
};

const updateIsDone = async (isDone: boolean, taskId: number, id: number) => {
  return await Checklist.update(
    { isDone },
    { where: { id: taskId, userId: id } }
  );
};

const removeTask = async (taskId: number, id: number) => {
  return await Checklist.destroy({ where: { id: taskId, userId: id } });
};

export default {
  addTask,
  getTasks,
  updateTask,
  updateIsDone,
  removeTask,
};
