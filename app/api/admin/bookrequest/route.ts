import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const booking_req = await prismadb.booking.findMany({
            where: { status: 'pending' },
            select: {
                id:true,
                checkin:true,
                checkout:true,
                children:true,
                adult:true,
                datetime:true,
                status:true,
                Book_room: {
                    select: {
                        room_type_id:true
                    }
                },
                Book_package: {
                    select: {
                        package_id:true
                    }
                }
            }
        })

        return NextResponse.json({
            booking:booking_req,
            message: "All book request have been sent successfully."
        }) 
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}