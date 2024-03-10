import express from "express";
import { config } from "dotenv";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import productRouter from "./Routes/productRoutes.js";
import database from "./Config/database.js";
import bodyParser from "body-parser";

const app = express();
const port = 4040;
export const saltRound = 3;


config();
database();
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());

app.use('/user',userRouter)

app.listen(port,()=>{
    console.log("Server Started");
})