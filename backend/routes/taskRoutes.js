import express from 'express';
import { addTask, deleteTask, getTask } from '../controllers/taskController.js'

const router = express.Router();

router.post('/add', addTask);
router.get('/get', getTask);
router.delete('/delete/:id', deleteTask);
export default router;