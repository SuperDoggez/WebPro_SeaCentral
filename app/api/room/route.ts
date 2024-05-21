import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const room_type = await prismadb.room_type.findMany()
        
        return NextResponse.json({
            room:room_type,
            message: "Room information have been sent successfully."
        })

    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}