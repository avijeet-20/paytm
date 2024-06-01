import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"
import  db  from "@repo/db/db"
import { AddMoney } from "../../../components/AddmoneyCard";
import { BalanceCard } from "../../../components/Balancecard";
import { OnRampTransaction } from "../../../components/OnRampTransaction";




async function getBalance () {
    const session = await getServerSession(authOptions)
    const balance = await db.balance.findFirst({
        where:{
            userId:Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions () {
    const session  = await getServerSession(authOptions);
    const transactions = await db.onRampTransaction.findMany({
        where:{
            userId:Number(session?.user?.id)
        }
    });
    return transactions.map(t => ({
            time:t.startTime,
            amount:t.amount,
            status:t.status,
            provider:t.provider
        }))
    
}

export default async  function() {
    const balance = await getBalance();
    const txns = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 font-bold">
        Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney></AddMoney>
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked}/>
                <div className="pt-4">
                    <OnRampTransaction transactions={txns} />
                </div>

            </div>
        </div>
    </div>
}