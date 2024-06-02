import express from "express";
import db from '@repo/db/db'
import cors from 'cors'
const app = express();
app.use(express.json())
app.use(cors());

app.post("/hdfcWebhook", async (req, res) => {
    console.log(req.body);
    //TODO: Add zod validation here?
    const paymentInformation: {
        token:string,
        userId:string,
        amount:string
    } = {
        token: req.body.data.token,
        userId: req.body.data.user_id,
        amount: req.body.data.amount
    };
    // Update balance in db, add txn

    try {
        await db.$transaction([
            db.balance.updateMany({
                where:{
                    userId:Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where:{
                    token:paymentInformation.token
                },
                data:{
                    status:"Success",
                }
            })
        ])
        res.json({
        message:'captured'
        })
    }catch(e) {
        console.log(e)
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }
})

app.listen(3003);