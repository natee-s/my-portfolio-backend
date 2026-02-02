// สร้าง API Route เพื่อรับข้อมูล
import express, { Router } from 'express'
import Contact from '../Contact.js'
import nodemailer from 'nodemailer'

//Router = กล่องรวม route ย่อย
const router = express.Router();

//create function for sent the email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

//สร้าง Route สำหรับรับข้อมูล (POST)
//เมื่อมี client ส่ง POST request มาที่ path '/' ให้รัน function นี้
router.post('/', async(req, res) =>{
    try{
        const{name, email, message} = req.body; //ดึงค่าออกมาจาก req.body

        // สร้างข้อมูลใหม่จาก Model
        const newContact = new Contact({
            name,
            email,
            message
        });

        //เอาข้อมูลชุดนี้ (newContact) บันทึกลงฐานข้อมูล
        // await “บันทึกข้อมูลนี้ รอจนบันทึกเสร็จจริง ๆ ก่อน แล้วค่อยทำขั้นตอนถัดไป”
        await newContact.save();

        //ตั้งค่ารายละเอียดอีเมลที่จะส่งหาตัวเอง
        const mailOption = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Message from ${name} (Portfolio)`,
            text: `คุณได้รับข้อความใหม่จาก Portfolio:\n\nname:${name}\nemail:${email}\nText:${message}`
        };

        //สั่งให้ส่ง email
        transporter.sendMail(mailOption,(error, info) => {
            if(error){
                console.log('Error sending email:', error)
            } else {
                console.log('Email sent:' + info.response);
            }
        })

        //.json() คือการ 👉 ส่งข้อมูลกลับไปให้ client ในรูปแบบ JSON
        res.status(201).json({message:'Message sent successfully.We will contact you as soon as possible.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Error sending message.'});
    }
});

export default router;
