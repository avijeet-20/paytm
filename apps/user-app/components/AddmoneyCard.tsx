"use client"

import { useState } from "react"
import { TextInput } from "@repo/ui/textinput";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import {Button} from '@repo/ui/button';
import { createOnrampTransactions } from "../lib/actions/createOnrampTransaction";



const SUPPORTED_BANKS = [{
    id:1,
    name:"HDFC Bank",
    redirectUrl:"https://netbankng.hdfcbank.com"
}, {
    id:2,
    name:"Axis Bank",
    redirectUrl:"https://www.axisbank.com"
}]

export const AddMoney = () => {
    const [redirectUrl,setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0);
    return <Card title="Add Money">
        <div className="w-full">
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {setValue(Number(val))}}/>
            <div className="py-4 text-left">
                Bank
            </div>
            <Select onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl)
                setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
             }} options={SUPPORTED_BANKS.map(x => ({
                key:x.name,
                value:x.name
             }))} ></Select>
             <div className="flex justify-center pt-4">
                <Button onClick={ async () => {
                    await createOnrampTransactions(provider,value);
                    window.location.href = redirectUrl || "";
                } }>
                    Add Money
                </Button>
             </div>
          
        </div>
    </Card>
}