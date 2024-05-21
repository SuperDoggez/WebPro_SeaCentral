import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import exp from "constants";

export async function PUT(req: Request) {
    try {
        const { contact, address} = await req.json()
        
        const newContact = await prismadb.hotel_info.updateMany({
            data: {
                contact,
                address
            }
        })

        return NextResponse.json({
            Hotelinfo:newContact,
            message: "Hotel contact and address have been changed"
        })


    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}

export async function GET(req: Request) {
    try {
        const contact = await prismadb.hotel_info.findMany()

        return NextResponse.json({
            Hotelinfo:contact,
            message: "Hotel contact and address have been sent succesfully"
        }) 

    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
        
    }
   
}