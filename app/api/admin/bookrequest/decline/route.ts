import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import { email, transport } from "@/lib/email";
import { declinedemail } from "@/lib/email";

interface Tourist {
    id: number,
    email: string,
    first_name: string,
    last_name: string
}

export async function PUT(req: Request) {
    try {
        const { id } = await req.json()

        const find_booking = await prismadb.booking.findUnique({
            where: { id:id },
            select: {
                id:true,
                tourist_id:true,
                Book_room:true,
                Book_activity:true,
                Book_package:true
            }
        })

        if (!find_booking) {
            return NextResponse.json({
                booking:null,
                message: "Booking not found"
            })
        }

        const tourist: Tourist | null = await prismadb.tourist_info.findUnique({
            where: { id:find_booking.tourist_id },
            select: {
                id:true,
                email:true,
                first_name:true,
                last_name:true
            }
        })

        if (!tourist) {
            return null
        }

        await transport.verify()
        
        await transport.sendMail({
            from: email.email,
            to: tourist?.email,
            subject: "SeaCentral accept booking request.",
            html: declinedemail(id,`${tourist.first_name}`,`${tourist.last_name}`)
        })

        const booking = await prismadb.booking.update({
            where: { id:id },
            data: {
                status: 'decline'
            }
        })

        if (find_booking.Book_room.length > 0) {
            const room = await prismadb.book_room.updateMany({
                where: { book_id:id },
                data: {
                    status: 'decline'
                }
            })
            if (find_booking.Book_activity.length > 0) {
                const activity = await prismadb.book_activity.updateMany({
                    where: { book_id:id },
                    data: {
                        status: 'decline'
                    }
                })
                return NextResponse.json({
                    booking:booking,
                    room:room,
                    activity:activity,
                    message: "Book room and activity request have been rejected."
                })
            }
            return NextResponse.json({
                booking:booking,
                room:room,
                message: "Book room request have been rejected."
            })
        } else {
            const package_ = await prismadb.book_package.updateMany({
                where: { book_id:id },
                data: {
                    status: 'decline'
                }
            })

            return NextResponse.json({
                package:package_,
                message: "Book package request have been rejected."
            })
        }


    } catch (error) {
        
        console.log(error);
        NextResponse.json({error})

    }
}