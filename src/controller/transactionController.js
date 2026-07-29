import {sql} from '../config/db.js';


export async function createTransaction(req, res) {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !user_id || !category || amount === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = await sql`
      INSERT INTO transactions(user_id,title,amount,category)
      VALUES (${user_id},${title},${amount},${category})
      RETURNING *
    `;

    console.log(transaction);
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error creating the transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getTransactionByUserId(req,res) {
    try {
            const {user_id} = req.params;
            const transactions= await sql`
              SELECT * FROM transactions
              where user_id =${user_id}
              ORDER BY create_at 
              desc
            `
            console.log(transactions);
            res.status(201).json(transactions);
         } catch (error) {
            console.log("Error getting the transactions ",error);
            res.status(500).json({
             message:"Internal server error"
            });
         }
}

export async function deleteTransaction(req,res) {
    try {
           const {id} = req.params;
           
           if(isNaN(parseInt(id))){
             return res.send(400).json({message:"Invalid transction Id"});
           }
    
           const result = await sql`
             DELETE FROM transactions WHERE id = ${id}
             RETURNING *
           `
           if(result.length==0){
             return res.status(404).json({message:"transaction not found"});
           }
           console.log(result);
           res.status(404).json({message:"Transaction deleted is successfully"});
       } catch (error) {
           console.log("Error deleting the transaction :",error);
           res.status(500).json({message:"Iternal server error"});
       }
}

export async function getSammuryById(req,res) {
     try {
      const {user_id} = req.params;
      const balanceResult = await sql`
        SELECT COALESCE(SUM(amount),0) as balance FROM transactions 
        WHERE user_id =${user_id}
      `
      const icomeResult = await sql`
        SELECT COALESCE(SUM(amount),0) as icome FROM transactions
        where user_id =${user_id} AND amount > 0
      `
      const expensesResult = await sql`
        SELECT COALESCE(SUM(amount),0) AS expenses FROM transactions
        WHERE user_id =${user_id} AND amount < 0
      `
      res.status(200).json(
         {
            balance:balanceResult[0].balance,
            icome :icomeResult[0].icome,
            expenses : expensesResult[0].expenses
         }
      )
   } catch (error) {
      console.log("Error getting summary transction ",error);
      res.status(400).json({message:"Interna server error"});
   }
}