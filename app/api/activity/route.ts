import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const activity = await prismadb.activity.findMany()
        
        return NextResponse.json({
            activity:activity,
            message: "Activity information have been sent successfully."
        })

    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}