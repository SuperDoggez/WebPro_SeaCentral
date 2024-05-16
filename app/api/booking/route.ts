import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function POST(req: Request) {
    function uniqueID() {
        return Math.floor(Math.random() * 3)
        }
    
    try {
        const id = uniqueID()
        
        const { first_name, last_name, email, phone_number, phone_number_2, description, total_price, country, for_other, checkin, checkout} = await req.json()

        const checkin_date = new Date(checkin)
        const checkout_date = new Date(checkout)

        const newTourist = await prismadb.tourist_info.create({
            data: {
                first_name,
                last_name,
                email,
                phone_number,
                phone_number_2,
                country,
                for_other
            }
        })

        const newBooking = await prismadb.booking.create({
            data: {
                id,
                description,
                total_price,
                checkin:checkin_date,
                checkout:checkout_date,
                status: "pending",
                tourist_id:newTourist.id
            }
        })
        
        return NextResponse.json({
            booking:newBooking,
            tourist:newTourist,
            message: "Book room succesfully"
        }, { status: 201 })
    
        
    } catch (error) {
        
        console.log(error);
        NextResponse.json({error})
        
    }
}