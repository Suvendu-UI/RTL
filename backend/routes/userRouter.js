import e from "express";
import mongoose from "mongoose";
import { signupRouter } from "../signup.js";

const app = e();

const userRouter = e.Router();

userRouter.use('/signup', signupRouter);

export default userRouter;