import express from "express";
import cors from "cors";

const app = express();

import * as dotenv from "dotenv";
dotenv.config();
app.use(express.json());
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);

import cookieParser from "cookie-parser";
app.use(cookieParser());

import { init } from "./config/db.config";
import "./models";
init(); //db connect

import router from "./routes";
import errorHandler from "./middlewares/error.middleware";
app.use("/api", router);
app.use(errorHandler);

export default app;
