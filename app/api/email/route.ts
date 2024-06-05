import { email, transport } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        console.log(email);
        
        const test = await transport.verify()
        console.log(test);
        
        const send = await transport.sendMail({
            from: email.email,
            to: "",
            subject: "",
            html: ""
        })

        return NextResponse.json({
            email:send,
            message: "Email sent successfully."
        })

    } catch (error) {
        
        console.log(error);
        return NextResponse.json(error)
        
    }
}