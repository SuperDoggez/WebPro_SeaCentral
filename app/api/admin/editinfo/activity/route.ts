import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import exp from "constants";

export async function PUT(req: Request) {
    try {
        const { id, name, description, price, per_person, start, end} = await req.json()
        
        const newActivity = await prismadb.activity.update({
            where: { id:parseInt(id) },
            data: {
                name, 
                description, 
                discount_price:price, 
                per_person,
                start,
                end
            }
        })

        return NextResponse.json({
            Activity:newActivity,
            message: "Activity have been changed."
        })


    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}

export async function GET(req: Request) {
    try {
        const activity = await prismadb.activity.findMany({
            select: {
                id:true,
                name:true,
                start:true,
                end:true,
                discount_price:true,
                per_person:true,
                picture:true
            }
        })

        return NextResponse.json({
            Activity:activity,
            message: "Activity have been sent succesfully."
        }) 

    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
        
    }
   
}