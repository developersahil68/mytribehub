import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, MERN backend with TypeScript!");
});

// Routes
app.use("/api/v1/users", userRouter);

export default app;
