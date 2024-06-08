import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const package_ = await prismadb.package.findMany()
        
        return NextResponse.json({
            package:package_,
            message: "Package information have been sent successfully."
        })

    } catch (error) {

        console.log(error);
        return NextResponse.json({error})
    
    }
}