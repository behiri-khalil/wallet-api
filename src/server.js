import express from "express";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRouter from './router/routerTransction.js';
import {initDB} from './config/db.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(rateLimiter);


const Port = process.env.Port;



app.use("/api/transactions/",transactionRouter)

initDB().then(()=>{
    app.listen(Port,()=>{
   console.log("Server is up and running on Port:" , Port);
});
})
