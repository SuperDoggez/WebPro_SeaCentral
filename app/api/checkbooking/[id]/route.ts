import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,params : { id: string}) {
    try {
        const booking = await prismadb.booking.findUnique({
            where: { id:parseInt(params.id)},
            include: {
                tourist_info:true,
                Book_activity:true,
                Book_package:true,
                Book_room:true
            }
        })

        if (!booking) {
            return NextResponse.json({
                booking:null,
                message: "Invalid BookingID."
            })
        }

        return NextResponse.json({
            booking:booking,
            message: "Booking information has been sent successfully."
        })
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}