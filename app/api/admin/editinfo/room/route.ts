import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import exp from "constants";

export async function PUT(req: Request) {
    try {
        const { id, description, price, double_bed, twin_bed, swimming_pool, bath_tub} = await req.json()
        
        const newRoom = await prismadb.room_type.update({
            where: { id:id },
            data: {
                description,
                price,
                twin_bed,
                double_bed,
                swimming_pool,
                bath_tub
            }
        })

        return NextResponse.json({
            Room:newRoom,
            message: "Room information have been changed."
        })


    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}

export async function GET(req: Request) {
    try {
        const allroom = await prismadb.room_type.findMany({
            select: {
                name:true,
                price:true,
                picture:true,
                swimming_pool:true,
                bath_tub:true
            }
        })

        return NextResponse.json({
            room:allroom,
            message: "All Room information have been sent succesfully."
        }) 

    } catch (error) {

        console.log(error);
        return NextResponse.json({error})     
    }
   
}