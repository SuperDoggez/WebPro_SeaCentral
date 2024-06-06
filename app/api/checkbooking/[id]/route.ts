import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

interface Room {
    id: number,
    name: string,
    price: number
}

interface Activity {
    id: number,
    name: string,
    discount_price: number
}

interface Package {
    id: number,
    name: string,
    price: number,
}

interface Count {
    id: number,
    count: number
}

export async function GET(req: Request,{ params } : { params : { id: string }}) {
    try {
        const booking = await prismadb.booking.findUnique({
            where: { id:parseInt(params.id)},
            select: {
                status:true,
                checkin:true,
                checkout:true,
                children:true,
                adult:true,
                description:true,
                tourist_info: {
                    select: {
                        id:true,
                        first_name:true,
                        last_name:true,
                        phone_number:true,
                        phone_number_2:true
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
        let roomcount: Count[] = []
        const room_type = await prismadb.book_room.findMany({
            where: { book_id:parseInt(params.id) },
        })

        if (room_type) {
            const rm:number[] = []
            const uniqueid = room_type.map(id => id.room_type_id).filter((id, index, self) => self.indexOf(id) === index)
            rm.push(...uniqueid)

            for (let i = 0;i < rm.length;i++) {
                const room_info = await prismadb.room_type.findMany({
                    where: { id:rm[i] },
                    select: {
                        id:true,
                        name:true,
                        price:true 
                    }
                })
                room.push(...room_info)
            }
            const room_id = room_type.map(room => room.room_type_id);
            const uniqueroom_id = [...new Set(room_id)];
            roomcount = uniqueroom_id.map(id => ({
                id,
                count: room_id.filter(roomid => roomid === id).length
            }));
        }

        let activity:Activity[] = []
        let activitycount:Count[] = []

        const activities = await prismadb.book_activity.findMany({
            where: { book_id:parseInt(params.id) },
        })

        if (activities) {
            const ac: number[] = []
            const uniqueid = activities.map(id => id.activity_id).filter((id, index, self) => self.indexOf(id) === index)
            ac.push(...uniqueid)

            for (let i = 0;i < ac.length;i++) {
                const activity_info = await prismadb.activity.findMany({
                    where: { id:ac[i] },
                    select: {
                        id:true,
                        name:true,
                        discount_price:true   
                    }
                })
                activity.push(...activity_info)
            }
            const activity_id = activities.map(id => id.activity_id)
            const uniqueactivityid = [... new Set(activity_id)]
            activitycount = uniqueactivityid.map(id => ({
                id,
                count: activity_id.filter(activityid => activityid = id).length
            }))
        }

        let package_: Package[] = []
        let packagecount: Count[] = []

        const packages = await prismadb.book_package.findMany({
            where: { book_id:parseInt(params.id) },
        })
        
        if (packages) {
            const pc:number[] = []
            const uniqueid = packages.map(id => id.package_id).filter((id, index, self) => self.indexOf(id) === index)
            pc.push(...uniqueid)

            for (let i = 0;i < pc.length;i++) {
                const package_info = await prismadb.package.findMany({
                    where: { id:pc[i] },
                    select: {
                        id:true,
                        name:true,
                        price:true  
                    }
                })
                package_.push(...package_info)
            }
            const package_id = packages.map(packagep => packagep.package_id);
            const uniquepackage_id = [...new Set(package_id)];
            packagecount = uniquepackage_id.map(id => ({
                id,
                count: package_id.filter(packageid => packageid === id).length
            }));
        }
        

        return NextResponse.json({
            booking,
            room,roomcount,
            activity,activitycount,
            package_,packagecount,
            message: "Booking information has been sent successfully."
        })
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}