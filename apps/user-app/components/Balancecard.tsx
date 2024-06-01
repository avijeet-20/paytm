import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount,locked} : {
amount: number;
locked: number;
}) => {
    return <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-300 pb-2">
            <div>
                Unlocked blance
            </div>
            <div>
                {amount/100}INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 pb-2">
            <div>
                Locked blance
            </div>
            <div>
                {locked/100}INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 pb-2">
            <div>
                Total blance
            </div>
            <div>
                {(locked + amount)/100}INR
            </div>
        </div>
    </Card>
}