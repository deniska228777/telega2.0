import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bp from 'body-parser';
import { login, signup } from "./routes.js";
import cookieParser from "cookie-parser";
const dbUrl = 'mongodb+srv://denisglol84:hilllkulichtelega23325445@cluster0.ea1aj2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const app = express();
const urlParser = bp.urlencoded({ extended: false }); 
dotenv.config()
const port = process.env.PORT || 6557


app.use(cors());
app.use(express.json());
app.use('/static', express.static('static'));
app.use('/src', express.static('src'));
app.use(cookieParser())
app.post('/auth/signup', urlParser, signup);
app.post('/auth/login', urlParser, login);

async function start() {
    await mongoose.connect(dbUrl)
    .then(() => app.listen(port, console.log(`Сервер начал работу по адресу http://localhost:${port}`)))
    .catch(err => console.log(err))
}

start();
