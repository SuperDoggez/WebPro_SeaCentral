import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function POST(req: Request) {
    
    try {
        const id = Math.floor(Math.random() * 100000000)
        
        const { first_name, last_name, email, phone_number, 
            phone_number_2, description, total_price, country, 
            for_other, checkin, checkout, room_type_id, activity_id, 
            package_id, adult, children} = await req.json()

        const checkin_date = new Date(checkin)
        const checkout_date = new Date(checkout)

        const date = new Date()
        const hour = 7
        const datetime = new Date(date.getTime() + (hour * 60 * 60 * 1000))
        
        console.log(date);
        
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
                tourist_id:newTourist.id,
                datetime,
                adult:String(adult),
                children:String(children)
            }
        })


        if (room_type_id) {
            for (let i = 0;i < room_type_id.length; i++) {
            await prismadb.book_room.create({
                data: { 
                    book_id:id,
                    room_type_id:room_type_id[i],
                    status: 'pending'
                }
            })
            }
        }

        if (activity_id) {
            for (let i = 0;i < activity_id.length; i++) {
            await prismadb.book_activity.create({
                data: { 
                    book_id:id,
                    activity_id:activity_id[i],
                    status: 'pending'
                }
            })
            }
        }

        if (package_id) {
            for (let i = 0;i < package_id.length; i++) {
                await prismadb.book_package.create({
                    data: { 
                        book_id:id,
                        package_id:package_id[i],
                        status: 'pending'
                    }
                })
                }
        }

        return NextResponse.json({
            booking:{newBooking},
            tourist:newTourist,
            message: "Booking request has been sent succesfully."
        }, { status: 201 })
    
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error},{status:404})
        
    }
}