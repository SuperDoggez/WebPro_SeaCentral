import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const book_history = await prismadb.booking.findMany({
            where: { 
                NOT: {
                    status: 'pending' 
                }
            },
            select: {
                id:true,
                checkin:true,
                checkout:true,
                children:true,
                datetime:true,
                status:true,
                Book_room: {
                    select: {
                        room_type_id:true
                    }
                }
            }
        })

        return NextResponse.json({
            book:book_history,
            message: "All book history have been sent successfully."
        }) 
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}