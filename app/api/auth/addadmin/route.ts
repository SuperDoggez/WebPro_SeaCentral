import { NextResponse } from "next/server"
import { hash } from 'bcrypt';
import { prismadb } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { username, email, password } = await req.json()
        
        const hashpassword = await hash(password , 5)
        const newAdmin = await prismadb.admin.create({
            data: {
                username,
                email,
                password:hashpassword,
            }
        })
        

        return NextResponse.json({
            admin:newAdmin,
            message: "Add admin successfully"
        },{ status: 201 }
    )

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            admin: null,
            message: "Error",
            error
        },{status: 409})
    }
}