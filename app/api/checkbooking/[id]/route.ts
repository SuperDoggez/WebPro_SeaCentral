import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

interface Activity {
    id: number,
    name: string,
    discount_price: number
}

interface Package {
    id: number,
    price: number,
    room_type: number,
    activity: number
}

interface Room {
    id: number,
    name: string,
    price: number
}

export async function GET(req: Request,{ params } : { params : { id: string }}) {
    try {
        const booking = await prismadb.booking.findUnique({
            where: { id:parseInt(params.id)},
            select: {
                tourist_info:true,
                Book_activity: {
                    select: {
                        activity_id:true
                    }
                },
                Book_package: {
                    select: {
                        package_id:true
                    }
                },
                Book_room: {
                    select: {
                        room_type_id:true
                    }
                }
            }
        })

        if (!booking) {
            return NextResponse.json({
                booking:null,
                message: "Invalid BookingID."
            })
        }

        const room:Room[] = []
        const room_type = await prismadb.book_room.findMany({
            where: { book_id:parseInt(params.id) },
        })

        if (room_type) {
            const rm:number[] = []
            const uniqueid = room_type.map(id => id.room_type_id).filter((id, index, self) => self.indexOf(id) === index)
            rm.push(...uniqueid)
            for (let i = 0;i < rm.length;i++) {
                const rooms = await prismadb.room_type.findMany({
                    where: { id:rm[i] },
                    select: {
                        id:true,
                        name:true,
                        price:true 
                    }
                })
                room.push(...rooms)
            }
        }

        let activity:Activity[] = []
        const activities = await prismadb.book_activity.findMany({
            where: { book_id:parseInt(params.id) },
        })

        if (activities) {
            const ac:number[] = []
            const uniqueid = activities.map(id => id.activity_id).filter((id, index, self) => self.indexOf(id) === index)
            ac.push(...uniqueid)
            for (let i = 0;i < ac.length;i++) {
                const all_activity = await prismadb.activity.findMany({
                    where: { id:ac[i] },
                    select: {
                        id:true,
                        name:true,
                        discount_price:true   
                    }
                })
                activity.push(...all_activity)
            }
        }

        let package_:Package[] = []
        // const packages = await prismadb.book_package.findMany({
        //     where: { book_id:parseInt(params.id) },
        // })

        // if (packages) {
        //     const pc:number[] = []
        //     const uniqueid = packages.map(id => id.package_id).filter((id, index, self) => self.indexOf(id) === index)
        //     pc.push(...uniqueid)
        //     for (let i = 0;i < pc.length;i++) {
        //         package_ = await prismadb.package.findMany({
        //             where: { id:pc[i] },
        //             select: {
        //                 id:true,
        //                 room_type:true,
        //                 activity:true,
        //                 price:true  
        //             }
        //         })
        //     }
        // }
        

        return NextResponse.json({
            booking:booking,
            activity,room,package_,
            message: "Booking information has been sent successfully."
        })
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}