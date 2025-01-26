import e from "express";
import rootRouter from "./routes/index.js";
import mongoose from "mongoose";

const app = e();

await mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8"
  )
  .then(console.log("Mongoose server is connected"));

app.use(e.json());

app.use("/", rootRouter);

app.listen(3000);
