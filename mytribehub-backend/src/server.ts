import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "config.env") });
import app from "./index";
const port = process.env.PORT || 8000;

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, MERN backend with TypeScript!");
// });

const DB = process.env.MONGO_CONNECTION_STRING;
if (!DB) {
  console.error(
    "MongoDb connection string is not defined in the environment varibales"
  );
  process.exit();
}
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error("DB connection error", err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
