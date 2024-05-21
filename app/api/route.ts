import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function PUT(req: Request) {
    try {
        

        
    } catch (error) {

        console.log(error);
        return NextResponse.json({error})

    }
}

export async function GET(req: Request,params : { id: string}) {
    try {
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}