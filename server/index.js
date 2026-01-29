// สร้างไฟล์ Server หลัก
// Import (นำเข้า) Library ที่จำเป็น
import express from 'express' //เป็น framework สำหรับสร้างเว็บเซิร์ฟเวอร์ ช่วยให้เราจัดการ routing และ HTTP requests ได้ง่ายขึ้น
import mongoose from 'mongoose' //เป็นตัวช่วยในการเชื่อมต่อและทำงานกับฐานข้อมูล MongoDB ทำให้การจัดการข้อมูลสะดวกขึ้น
import cors from 'cors' //ช่วยให้เว็บไซต์จากโดเมนอื่นสามารถเรียกใช้ API ของเราได้
import dotenv from 'dotenv' //ช่วยในการอ่านค่าตัวแปรจากไฟล์ .env เพื่อเก็บข้อมูลที่เป็นความลับ เช่น password, API keys
import contactRoutes from './model/routes/contactRoutes.js'

// สั่งให้ dotenv ทำงาน โดยจะไปอ่านไฟล์ .env และนำค่าต่างๆ มาเก็บไว้ใน process.env
dotenv.config()

//สร้างตัวแปร app ที่เก็บแอปพลิเคชัน Express
const app = express();

//ตั้งค่า Middleware
//เปิดใช้งาน CORS ทำให้ frontend ที่รันอยู่บนโดเมนอื่นสามารถเรียกใช้ API นี้ได้
app.use(cors({
    origin:['http:localhost:5173','https://my-portfolio-nine-nu-uwdfqx2mwu.vercel.app/'],
    methods:['GET','POST'],
    Credential: true
}));  
app.use(express.json()); //ตั้งค่าให้เซิร์ฟเวอร์สามารถรับและแปลงข้อมูล JSON ที่ส่งมาได้ (เช่น ข้อมูลจาก POST request)
app.use('/api/contact', contactRoutes) //ถ้ามี request ที่ขึ้นต้นด้วย /api/contact ให้ส่งต่อไปจัดการที่ contactRoutes

mongoose.connect(process.env.MONGODB_URI) //สั่งให้ mongoose เชื่อมต่อกับ MongoDB โดยใช้ URL ที่เก็บไว้ในตัวแปร MONGODB ในไฟล์ .env
    .then(() => console.log('Connected to MongoDB!')) //ถ้าเชื่อมต่อสำเร็จ จะแสดงข้อความ "Connected to MongoDB!"
    .catch((err) => console.error('Connection error:',err)); // ถ้าเชื่อมต่อไม่สำเร็จ จะแสดงข้อความ error ให้ส่งต่อไปจัดการที่ contactRoutes

const PORT = process.env.PORT || 5000; //ถ้าไม่มีค่าใน .env จะใช้ค่า default คือ 5000
app.listen(PORT, ()=> {       //บอก server ให้เริ่มทำงาน
    console.log(`Server is running on port ${PORT}`);
});