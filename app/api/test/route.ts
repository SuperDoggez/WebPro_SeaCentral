import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request) {
    
    try {
        const room_type_id = [1,1,1,1,2,3,2]
        const id = 101

        for (let i = 0;i < room_type_id.length; i++) {
            const book = await prismadb.book_room.create({
                data: { 
                    book_id:id,
                    room_type_id:room_type_id[i],
                    status: 'pending'
                }
            })
        }

        const find = await prismadb.book_room.findMany({
            where: { book_id:id }
        })
        
        return NextResponse.json({
            output:find,
            message: "testing"
        }, { status: 200 })
    
        
    } catch (error) {
        
        console.log(error);
        NextResponse.json({error})
        
    }
}