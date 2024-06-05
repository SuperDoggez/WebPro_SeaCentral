import nodemailer from "nodemailer";

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

