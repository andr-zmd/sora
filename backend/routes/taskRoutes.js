import express from 'express';
import { getTasks, addTask, updateTask, deleteTask } from '../controllers/taskController.js';

const taskRoutes = express.Router();

taskRoutes.get("/getTasks", getTasks);

taskRoutes.post("/addTask", addTask);

taskRoutes.put("/updateTask", updateTask);

taskRoutes.delete("/deleteTask/:taskId", deleteTask);

export default taskRoutes;