import express from 'express';
import { login, register, getStatus} from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login); 
userRouter.get("/status", getStatus);
export default userRouter;