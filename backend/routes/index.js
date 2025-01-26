import e from "express";
import userRouter from "../routes/userRouter.js";

const rootRouter = e.Router();


rootRouter.use('/user', userRouter);

export default rootRouter;