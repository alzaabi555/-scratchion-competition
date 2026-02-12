import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";
import { createRegistration, getAllRegistrations } from "./db";
import { invokeLLM } from "./_core/llm";

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
        grade: z.enum(["grade3"]),
      }))
      .mutation(async ({ input }) => {
        try {
          // Save registration to database
          await createRegistration({
            schoolName: input.schoolName,
            studentName: input.studentName,
            grade: input.grade,
          });

          // Get supervisor email from environment
          const supervisorEmail = process.env.SUPERVISOR_EMAIL || "umsufyan2008@gmail.com";

          // Send email using LLM-based email service
          const emailContent = `
تم استقبال تسجيل جديد في مسابقة سكراتشيون:

🏫 المدرسة: ${input.schoolName}
👨‍🎓 اسم الطالب: ${input.studentName}
📚 الصف: الصف الثالث
⏰ وقت التسجيل: ${new Date().toLocaleString('ar-SA')}

شكراً لمشاركتك في مسابقة سكراتشيون!
          `;

          // Send notification to Manus dashboard
          await notifyOwner({
            title: "📝 تسجيل جديد في مسابقة سكراتشيون",
            content: emailContent,
          });

          // Try to send email via Manus notification system
          try {
            const response = await fetch(process.env.BUILT_IN_FORGE_API_URL + '/email/send', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                to: supervisorEmail,
                subject: 'تسجيل جديد في مسابقة سكراتشيون',
                html: `
                  <div dir="rtl" style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #00D9FF;">تم استقبال تسجيل جديد في مسابقة سكراتشيون</h2>
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                      <p><strong>🏫 المدرسة:</strong> ${input.schoolName}</p>
                      <p><strong>👨‍🎓 اسم الطالب:</strong> ${input.studentName}</p>
                      <p><strong>📚 الصف:</strong> الصف الثالث</p>
                      <p><strong>⏰ وقت التسجيل:</strong> ${new Date().toLocaleString('ar-SA')}</p>
                    </div>
                    <p>شكراً لمشاركتك في مسابقة سكراتشيون!</p>
                  </div>
                `,
              }),
            });

            const emailResult = await response.json();
            console.log('[Email] Send result:', emailResult);
          } catch (emailError) {
            console.error('[Email] Failed to send email:', emailError);
          }

          return {
            success: true,
            message: "تم تسجيل المشاركة بنجاح",
            data: {
              schoolName: input.schoolName,
              studentName: input.studentName,
              grade: input.grade,
            },
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

    // Get all registrations
    list: publicProcedure
      .query(async () => {
        return await getAllRegistrations();
      }),
  })
});

export type AppRouter = typeof appRouter;
