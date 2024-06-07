 'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/db";



export async function p2p (amount:number,to:string) {
 const session = await getServerSession(authOptions);
 const from = session?.user?.id;
 console.log(from)
 console.log(to)
 console.log(amount)
 if(!from){
    return{
        message:"Erro while sending"
    }
 }
 const toUser = await db.user.findFirst({
    where:{
        number:to
    }
 })
console.log(toUser)
 if(!toUser) {
    return {
        message:"User not found"
    }
 }

 await db.$transaction(async (tx) => {
    await tx.$queryRaw `SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE ;`
  
    const fromBalance = await tx.balance.findUnique({
        where:{
            userId:Number(from)
        }
    })
    if(!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient Balance")
    }
    console.log('1st log')
    await new Promise(r => setTimeout(r,4000));
    const two =await tx.balance.update({
       data:{
            amount:{decrement:amount}
        },  where:{
            userId:Number(from)
        }
    })
console.log(two)
console.log('2nd log')
   const three = await tx.balance.update({
        data:{
            amount:{increment:amount}
        }, where:{
            userId:Number(toUser.id)
        }
    })
    console.log(three)
console.log('done')
    
 })

}