import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, service, message } = await req.json();

        // Configure the transporter with your email server details (Hostinger/Titan)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.titan.email', // Default for Hostinger/Titan
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, // e.g., hello@atulautomation.com
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`, // Send FROM your own authenticated email
            replyTo: email, // Reply to the user's email directly
            to: 'hello@atulautomation.com', // Admin email receiving the message
            subject: `New Lead: ${name} - ${service}`,
            text: `
        Name: ${name}
        Email: ${email}
        Service: ${service}
        
        Message:
        ${message}
      `,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #F97316;">New Lead Notification</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service Interest:</strong> ${service}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false, message: 'Failed to send message.', error: String(error) }, { status: 500 });
    }
}
