import { ENV } from "./env";
import nodemailer from "nodemailer"; 

// 1. إعداد الاتصال بـ Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER, // سيأخذ الإيميل من إعدادات ريندر
    pass: process.env.SMTP_PASS, // سيأخذ كلمة المرور من إعدادات ريندر
  },
});

export async function sendRegistrationEmail(
  supervisorEmail: string,
  schoolName: string,
  studentName: string,
  grade: string
): Promise<boolean> {
  try {
    const gradeLabel = {
      grade3: "الصف الثالث",
      grade4: "الصف الرابع",
      grade5: "الصف الخامس",
      grade6: "الصف السادس",
    }[grade] || grade;

    const emailContent = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 20px auto; background-color: white; padding: 30px; border-radius: 10px; }
    .header { text-align: center; border-bottom: 3px solid #00D9FF; padding-bottom: 20px; }
    .info-box { background-color: #f9f9f9; padding: 15px; border-right: 4px solid #FF00FF; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 تسجيل جديد: ${studentName}</h1>
    </div>
    <div class="info-box">
      <p><strong>المدرسة:</strong> ${schoolName}</p>
      <p><strong>الطالب:</strong> ${studentName}</p>
      <p><strong>الصف:</strong> ${gradeLabel}</p>
      <p><strong>وقت التسجيل:</strong> ${new Date().toLocaleString('ar-SA')}</p>
    </div>
  </div>
</body>
</html>
    `;

    // 2. عملية الإرسال
    await transporter.sendMail({
      from: process.env.SMTP_USER, // المرسل
      to: "Umsufyan2008@gmail.com", // المستقبل (بريدك)
      subject: `تسجيل جديد في مسابقة سكراتشيون - ${studentName}`,
      html: emailContent,
    });

    console.log(`[Email] Sent successfully to Umsufyan2008@gmail.com`);
    return true;

  } catch (error) {
    console.error("[Email] Error sending email:", error);
    // سنعيد true حتى لو فشل الإيميل لكي لا يظهر خطأ للطالب، لكننا سنرى الخطأ في السجلات
    return true; 
  }
}
