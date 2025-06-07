import { queryGetTask } from "../models/taskModel.js";

export async function getTasks(req, res) {
  const userId = req.params.userId;
  const tasks = await   queryGetTask(userId);
  res.json(tasks);
}

export function addTask(req, res) {
  
}

export function updateTask(req, res) {

}

export function deleteTask(req, res) {
}