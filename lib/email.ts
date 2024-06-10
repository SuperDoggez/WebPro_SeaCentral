import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { acceptedemailTemplate, declinedemailTemplate  } from "./email-template";

interface email {
    email:string|undefined
    password:string|undefined
}

export const email:email = {
    email:process.env.EMAIL,
    password:process.env.EMAIL_PASSWORD
} 

export const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email.email,
        pass: email.password
    }
})

export function acceptedemail(id:number, first_name:string, last_name:string ) {
    const template = Handlebars.compile(acceptedemailTemplate);
    const htmlbody = template({
        id:id,
        first_name:first_name,
        last_name:last_name 
    })
    return htmlbody
}

export function declinedemail(id:number, first_name:string, last_name:string ) {
    const template = Handlebars.compile(declinedemailTemplate);
    const htmlbody = template({
        id:id,
        first_name:first_name,
        last_name:last_name 
    })
    return htmlbody
}