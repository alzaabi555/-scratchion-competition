import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";

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

          // Send notification to owner with registration details
          const gradeLabel = {
            grade3: "الصف الثالث",
            grade4: "الصف الرابع",
            grade5: "الصف الخامس",
            grade6: "الصف السادس",
          }[input.grade];

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
