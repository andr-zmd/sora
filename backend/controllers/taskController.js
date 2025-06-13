import { queryGetTask, queryAddTask, queryDeleteTask, queryUpdateTask } from "../models/taskModel.js";

export async function getTasks(req, res) {
  try {
    const tasks = await queryGetTask(req.session.userId);
    res.json(tasks);
  } catch {
    res.status(500).json({ error: "Error fetching task" });
  }
}

export async function addTask(req, res) {
  const { title, description, date} = req.body;
  console.log(req.session.userId);
  try {
    await queryAddTask(req.session.userId, title, description, date); 
  } catch (err) {
    res.status(500).json({ error: "Error adding task" });
  }
}

export async function updateTask(req, res) {
  const { taskId, title, date, description } = req.body;
  try {
    await queryUpdateTask(req.session.userId, taskId, title, description, date);
  } catch (err) {
    res.status(500).json({ error: "Error updating task" });
  }
}

export async function deleteTask(req, res) {
  const {taskId} = req.params;
  try {
    await queryDeleteTask(req.session.userId, taskId);
  } catch (err) {
    res.status(500).json({ error: "Error deleting task" });
  }
}