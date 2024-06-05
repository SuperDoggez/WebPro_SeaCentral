import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function POST(req: Request) {
    
    try {
        const id = Math.floor(Math.random() * Date.now())
        
        const { first_name, last_name, email, phone_number, phone_number_2, description, total_price, country, for_other, checkin, checkout, room_type_id, activity_id, package_id} = await req.json()

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
            booking:{...newBooking,id:newBooking.id.toString()},
            tourist:newTourist,
            message: "Book room succesfully"
        }, { status: 201 })
    
        return NextResponse.json({message:"hi"})
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error},{status:404})
        
    }
}