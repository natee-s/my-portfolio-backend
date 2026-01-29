// สร้าง Schema หน้าตาของข้อมูล
import mongoose from "mongoose";

//กำหนด "หน้าตา" หรือ "กฎเกณฑ์" ของข้อมูลที่เราจะเก็บ
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

//สร้างโมเดล (Model)
// 'Contact' ชื่อ Model
// mongoose จะสร้าง collection ชื่อ contacts
// contactSchema เป็น schema ที่เราสร้างไว้
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
