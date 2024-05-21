import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import exp from "constants";

export async function PUT(req: Request) {
    try {
        const { id, name, description, price, per_person} = await req.json()
        
        const newActivity = await prismadb.activity.update({
            where: { id:id },
            data: {
                name, 
                description, 
                price, 
                per_person
            }
        })

        return NextResponse.json({
            Activity:newActivity,
            message: "Activity have been changed"
        })


    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}

export async function GET(req: Request) {
    try {
        const activity = await prismadb.activity.findMany()

        return NextResponse.json({
            Activity:activity,
            message: "Activity have been sent succesfully"
        }) 

    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
        
    }
   
}