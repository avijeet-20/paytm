import { NextResponse } from "next/server";
import {PrismaClient} from '@repo/db/client'

const client = new PrismaClient();


export const GET = async () => {
    await client.user.create({
        data:{
            email:"adsfasdfasdfasdfa@gmail.com",
            name:"asssa"
        }
    })

    return NextResponse.json({message:'user created'});
}