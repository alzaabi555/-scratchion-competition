import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";
import { sendEmail } from "./_core/dataApi";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Registration router
  register: router({
    submit: publicProcedure
      .input(z.object({
        schoolName: z.string().min(1, "School name is required"),
        studentName: z.string().min(1, "Student name is required"),
        grade: z.enum(["grade3", "grade4", "grade5", "grade6"]),
      }))
      .mutation(async ({ input }) => {
        try {
          // Prepare registration data
          const registrationData = {
            schoolName: input.schoolName,
            studentName: input.studentName,
            grade: input.grade,
            registeredAt: new Date().toISOString(),
          };

          // Get supervisor email from environment
          const supervisorEmail = process.env.SUPERVISOR_EMAIL || "umsufyan2008@gmail.com";

          // Grade label mapping
          const gradeLabel = {
            grade3: "الصف الثالث",
            grade4: "الصف الرابع",
            grade5: "الصف الخامس",
            grade6: "الصف السادس",
          }[input.grade];

          // Send email to supervisor
          const emailHtml = `
            <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; background-color: #f5f5f5;">
              <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #00D9FF; margin-bottom: 20px;">📝 تسجيل جديد في مسابقة سكراتشيون</h2>
                <p style="color: #333; font-size: 16px; line-height: 1.6;">
                  تم استقبال تسجيل جديد في المسابقة:
                </p>
                <div style="background-color: #f9f9f9; padding: 15px; border-right: 4px solid #00D9FF; margin: 20px 0;">
                  <p style="margin: 10px 0;"><strong>🏫 المدرسة:</strong> ${input.schoolName}</p>
                  <p style="margin: 10px 0;"><strong>👨‍🎓 اسم الطالب:</strong> ${input.studentName}</p>
                  <p style="margin: 10px 0;"><strong>📚 الصف:</strong> ${gradeLabel}</p>
                  <p style="margin: 10px 0;"><strong>⏰ وقت التسجيل:</strong> ${new Date(registrationData.registeredAt).toLocaleString('ar-SA')}</p>
                </div>
                <p style="color: #666; font-size: 14px; margin-top: 20px;">
                  يرجى التحقق من البيانات والتواصل مع المدرسة إن لزم الأمر.
                </p>
              </div>
            </div>
          `;

          const emailSent = await sendEmail({
            to: supervisorEmail,
            subject: `📝 تسجيل جديد في مسابقة سكراتشيون - ${input.studentName}`,
            html: emailHtml,
            from: "noreply@scratchion.com",
          });

          // Also send notification to Manus dashboard
          const notificationResult = await notifyOwner({
            title: "📝 تسجيل جديد في مسابقة سكراتشيون",
            content: `
تم استقبال تسجيل جديد في المسابقة:

🏫 المدرسة: ${input.schoolName}
👨‍🎓 اسم الطالب: ${input.studentName}
📚 الصف: ${gradeLabel}
⏰ وقت التسجيل: ${new Date(registrationData.registeredAt).toLocaleString('ar-SA')}

يرجى التحقق من البيانات والتواصل مع المدرسة إن لزم الأمر.
            `,
          });

          return {
            success: true,
            message: "تم تسجيل المشاركة بنجاح",
            data: registrationData,
            emailSent: emailSent,
            notificationSent: notificationResult,
          };
        } catch (error) {
          console.error("Registration error:", error);
          return {
            success: false,
            message: "حدث خطأ أثناء التسجيل",
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      }),
  })
});

export type AppRouter = typeof appRouter;
