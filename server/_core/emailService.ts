import { ENV } from "./env";

export async function sendRegistrationEmail(
  supervisorEmail: string,
  schoolName: string,
  studentName: string,
  grade: string
): Promise<boolean> {
  try {
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      console.error("[Email] Missing API configuration");
      return false;
    }

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
    .container { max-width: 600px; margin: 20px auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { text-align: center; border-bottom: 3px solid #00D9FF; padding-bottom: 20px; margin-bottom: 20px; }
    .header h1 { color: #00D9FF; margin: 0; }
    .content { color: #333; line-height: 1.8; }
    .info-box { background-color: #f9f9f9; padding: 15px; border-right: 4px solid #FF00FF; margin: 15px 0; }
    .info-label { font-weight: bold; color: #00D9FF; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 تسجيل جديد في مسابقة سكراتشيون</h1>
    </div>
    
    <div class="content">
      <p>مرحباً بك،</p>
      <p>تم استقبال تسجيل جديد في مسابقة سكراتشيون. إليك تفاصيل المشارك:</p>
      
      <div class="info-box">
        <p><span class="info-label">🏫 المدرسة:</span> ${schoolName}</p>
        <p><span class="info-label">👨‍🎓 اسم الطالب:</span> ${studentName}</p>
        <p><span class="info-label">📚 الصف:</span> ${gradeLabel}</p>
        <p><span class="info-label">⏰ وقت التسجيل:</span> ${new Date().toLocaleString('ar-SA')}</p>
      </div>
      
      <p>يرجى التحقق من البيانات والتواصل مع المدرسة إن لزم الأمر.</p>
      
      <p>شكراً لك على متابعتك لمسابقة سكراتشيون.</p>
    </div>
    
    <div class="footer">
      <p>© 2026 مسابقة سكراتشيون - جميع الحقوق محفوظة</p>
    </div>
  </div>
</body>
</html>
    `;

    // Call the Manus email API
    const response = await fetch(`${ENV.forgeApiUrl}/webdevtoken.v1.WebDevService/CallApi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ENV.forgeApiKey}`,
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({
        apiId: "Email/send",
        body: {
          to: supervisorEmail,
          subject: `تسجيل جديد في مسابقة سكراتشيون - ${studentName}`,
          html: emailContent,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Email] API Error:", response.status, errorText);
      return false;
    }

    const result = await response.json();
    console.log("[Email] Successfully sent to:", supervisorEmail);
    return true;
  } catch (error) {
    console.error("[Email] Error sending email:", error);
    return false;
  }
}
