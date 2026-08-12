import dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`
});
import { print } from "./utils/logger";
global.print = print;
import express, { Request, Response } from "express";
import cors from "cors";
import { authenticateToken } from "./jwt/jwt";
import { errorHandler } from "./middlewares/errorHandler";

import AuthApiRoute from "./routes/auth.router";
import { connectDB } from "./db/db.functions";
import thoughtRouter from "./routes/thought.router";
import tagRouter from "./routes/tag.router";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:8081"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send(`
  <html>
    <head><title>Test</title></head>
    <body>
      <h1>Hello from Express</h1>
      <p>This is a simple HTML response.</p>
    </body>
  </html>
`);
});

connectDB()

app.use("/auth", AuthApiRoute);
app.use("/api/thought", authenticateToken, thoughtRouter);
app.use("/api/tag", authenticateToken, tagRouter);

app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "test route", status: 200 });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => { print("server listening on ", port); });
  }
  catch (error) { print("MongoDB connection failed", error); process.exit(1); }
};


startServer();



module.exports = app;


