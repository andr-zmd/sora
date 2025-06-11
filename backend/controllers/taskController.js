import { queryGetTask, queryAddTask, queryDeleteTask } from "../models/taskModel.js";

const tempId = 1;

export async function getTasks(req, res) {
  try {
    const tasks = await queryGetTask(tempId);
    console.log(tasks);
    res.json(tasks);
  } catch {
    res.status(500).json({ error: "Error Fetching Task" });
  }
}

export function addTask(req, res) {
  const { title, description, date} = req.body;
  queryAddTask(tempId, title, description, date); 
}

export function updateTask(req, res) {

}

export function deleteTask(req, res) {
  const {taskId} = req.params;
  queryDeleteTask(tempId, taskId);
}