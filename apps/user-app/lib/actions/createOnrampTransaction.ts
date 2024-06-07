'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/db";
import axios from "axios";
import { findSourceMap } from "module";



export const createOnrampTransactions = async (provider:string,amount:number) => {
    const session = await getServerSession(authOptions)
console.log(amount)
    if(!session.user || !session.user.id) {
        return {
            message:'Unauthorized User'
        }
    }

    const token = (Math.random() * 1000).toString();
    await db.onRampTransaction.create({
        data:{
            provider,
            status:"Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session.user.id),
            amount: amount *100
        }
    })

  

    const finalamnt = amount * 100;
    console.log(finalamnt)
    
   const req = await axios.post('http://localhost:3003/hdfcWebhook',{
        data:{
            user_id:Number(session.user.id),
            amount: finalamnt,
            token: token
        }
     
    })
    console.log('post request gone')


    return {
        message:"Done"
    }

}