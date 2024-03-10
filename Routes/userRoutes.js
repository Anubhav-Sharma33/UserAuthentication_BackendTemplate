import {Router} from "express";
import { createUser, getUserInfo } from "../Middleware/UserController.js";

const userRouter = Router();

userRouter.post('/signup',createUser);

userRouter.post('/signin',getUserInfo);

export default userRouter;