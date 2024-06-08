import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const contact = await prismadb.hotel_info.findMany()
        
        return NextResponse.json({
            contact:contact,
            message: "Contact information have been sent successfully."
        })

    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}