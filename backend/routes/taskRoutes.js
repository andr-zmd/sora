import express from 'express';
import { addTask, deleteTask, updateTask, getTask } from '../controllers/taskController.js'

const router = express.Router();

router.post('/add', addTask);
router.get('/get', getTask);
router.put('/update', updateTask);
router.delete('/delete/:id', deleteTask);
export default router;