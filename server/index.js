import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bp from "body-parser";
import { login, refresh, signup, getUsers, logout } from "./routes.js";
import cookieParser from "cookie-parser";
import { authChecker } from "./authChecker.js";
const dbUrl = "mongodb+srv://denisglol84:hilllkulichtelega23325445@cluster0.ea1aj2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
const urlParser = bp.urlencoded({ extended: false });
dotenv.config();
const port = process.env.PORT || 6557;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/static", express.static("static"));
app.use("/src", express.static("src"));
app.use(cookieParser());

app.post("/auth/signup", urlParser, signup);
app.post("/auth/login", urlParser, login);
app.post("/auth/logout", logout);

app.get("/refreshtoken", urlParser, refresh);
app.get("/getusers", authChecker, getUsers);

async function start() {
  await mongoose
    .connect(dbUrl)
    .then(() =>
      app.listen(
        port,
        console.log(`Сервер начал работу по адресу http://localhost:${port}`)
      )
    )
    .catch((err) => console.log(err));
}

start();
