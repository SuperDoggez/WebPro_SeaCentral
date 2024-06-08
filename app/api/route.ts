import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function POUT(req: Request) {
    try {
        
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({error})

    }
}

export async function GET(req: Request,{ params } : { params : { id: string }}) {
    try {
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}