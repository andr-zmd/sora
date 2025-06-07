import express from 'express';
import { getTasks, addTask, updateTask, deleteTask } from '../controllers/taskController.js';

const taskRoutes = express.Router();

taskRoutes.get("/getTasks/:userId", getTasks);

taskRoutes.post("/addTask", addTask);

taskRoutes.put("/updateTask", updateTask);

taskRoutes.delete("/deleteTask", deleteTask);

export default taskRoutes;