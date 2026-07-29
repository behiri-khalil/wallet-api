import express from "express";
import {sql} from "../config/db.js";
import {createTransaction, deleteTransaction, getSammuryById, getTransactionByUserId} from "../controller/transactionController.js"

const router = express.Router();

router.post("/", createTransaction);

router.get('/:user_id', createTransaction);

router.delete("/:id",deleteTransaction);

router.get("/summary/:user_id",getSammuryById);


export default router;