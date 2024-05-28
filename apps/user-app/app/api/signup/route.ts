import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

console.log('yo')

export const POST = async (req:NextRequest) => {
    const body = await req.json();

    try{
        const user = await db.user.create({
            data:{
                name:body.name,
                email:body.email,
                number:body.number,
                password:body.password
            }
        })
        console.log(user)
        return NextResponse.json({message:"user created"})
    }catch(e){
        console.log(e)
    }
}