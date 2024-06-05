import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,params : { id: string}) {
    try {
        const book_req = await prismadb.booking.findUnique({
            where: { id:parseInt(params.id) },
            select: {
                id:true,
                checkin:true,
                checkout:true,
                children:true,
                adult:true,
                description:true,
                status:true,
                tourist_info: {
                    select: {
                        id:true,
                        first_name:true,
                        last_name:true,
                        phone_number:true,
                        phone_number_2:true,
                        email:true,
                        country:true,
                    }
                },
                Book_room: {
                    select: {
                        room_type_id:true,
                        Room_type: {
                            select: {
                                price:true,
                                picture:true,
                                name:true
                            }
                        }
                    }
                },
                Book_activity: {
                    select: {
                        activity_id:true,
                        Activity: {
                            select: {
                                price:true,
                                name:true
                            }
                        }
                    }
                }, 
                Book_package: {
                    select: {
                        package_id:true,
                        Package: {
                            select: {
                                price:true,
                            }
                        }
                    }
                }

            }
        })
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}