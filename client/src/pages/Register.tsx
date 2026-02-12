import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Sparkles, Trophy, Heart, Star, Zap } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

type SubmissionState = 'form' | 'loading' | 'success' | 'error';

export default function Register() {
  const [, setLocation] = useLocation();
  const [state, setState] = useState<SubmissionState>('form');
  const [formData, setFormData] = useState({
    schoolName: "",
    studentName: "",
    grade: ""
  });

  const registerMutation = trpc.register.submit.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      grade: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.schoolName || !formData.studentName || !formData.grade) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    setState('loading');

    try {
      const result = await registerMutation.mutateAsync({
        schoolName: formData.schoolName,
        studentName: formData.studentName,
        grade: "grade3",
      });

      if (result.success) {
        setState('success');
        // إعادة تعيين النموذج بعد 5 ثوان
        setTimeout(() => {
          setFormData({
            schoolName: "",
            studentName: "",
            grade: ""
          });
          setState('form');
        }, 5000);
      } else {
        setState('error');
        setTimeout(() => setState('form'), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setState('error');
      setTimeout(() => setState('form'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground grid-pattern relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 hover:text-primary transition"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="font-semibold">العودة للرئيسية</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-background" />
            </div>
            <h1 className="text-2xl font-bold neon-glow">سكراتشيون</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-12 px-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="container mx-auto max-w-2xl">
          {/* Form State */}
          {state === 'form' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold">
                  <span className="neon-glow">انضم إلينا! 🚀</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  سجل الآن في مسابقة سكراتشيون وأظهر مهاراتك البرمجية
                </p>
              </div>

              {/* Registration Form */}
              <Card className="card-glow p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* School Name */}
                  <div className="space-y-2">
                    <Label htmlFor="schoolName" className="text-foreground font-semibold text-lg">
                      اسم المدرسة *
                    </Label>
                    <Input
                      id="schoolName"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      placeholder="أدخل اسم مدرستك"
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground h-12 text-lg"
                    />
                  </div>

                  {/* Student Name */}
                  <div className="space-y-2">
                    <Label htmlFor="studentName" className="text-foreground font-semibold text-lg">
                      اسم الطالب الثلاثي *
                    </Label>
                    <Input
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="أدخل اسمك الكامل"
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground h-12 text-lg"
                    />
                  </div>

                  {/* Grade */}
                  <div className="space-y-2">
                    <Label htmlFor="grade" className="text-foreground font-semibold text-lg">
                      الصف الدراسي *
                    </Label>
                    <Select value={formData.grade} onValueChange={handleSelectChange}>
                      <SelectTrigger className="bg-input border-border text-foreground h-12 text-lg">
                        <SelectValue placeholder="اختر صفك الدراسي" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="grade3">الصف الثالث</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="btn-neon text-background font-bold text-lg px-8 py-6 w-full mt-8"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? 'جاري التسجيل...' : 'تسجيل المشاركة'}
                  </Button>
                </form>
              </Card>

              {/* Info Box */}
              <Card className="card-glow-secondary">
                <div className="flex gap-3">
                  <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-muted-foreground">
                      ستتلقى تأكيد التسجيل على البريد الإلكتروني للمدرسة. تأكد من ملء البيانات بشكل صحيح!
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Loading State */}
          {state === 'loading' && (
            <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-in fade-in duration-300">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary animate-spin"></div>
                <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                  <Zap className="w-10 h-10 text-primary animate-pulse" />
                </div>
              </div>
              <p className="text-xl font-semibold text-center">
                جاري تسجيل مشاركتك... ⏳
              </p>
            </div>
          )}

          {/* Success State */}
          {state === 'success' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-6">
                {/* Celebration Animation */}
                <div className="flex justify-center gap-4 mb-6">
                  <Trophy className="w-16 h-16 text-accent animate-bounce" style={{ animationDelay: '0s' }} />
                  <Star className="w-16 h-16 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <Heart className="w-16 h-16 text-secondary animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>

                {/* Success Message */}
                <div className="space-y-4">
                  <h2 className="text-5xl font-bold neon-glow-accent">
                    مبروك! 🎉
                  </h2>
                  <p className="text-2xl font-bold text-foreground">
                    تم تسجيلك بنجاح في مسابقة سكراتشيون!
                  </p>
                </div>

                {/* Success Details */}
                <Card className="card-glow-secondary space-y-4">
                  <div className="space-y-3 text-right">
                    <div className="flex justify-end gap-3 items-center">
                      <span className="text-lg font-semibold">{formData.schoolName}</span>
                      <span className="text-primary">🏫</span>
                    </div>
                    <div className="flex justify-end gap-3 items-center">
                      <span className="text-lg font-semibold">{formData.studentName}</span>
                      <span className="text-primary">👨‍🎓</span>
                    </div>
                    <div className="flex justify-end gap-3 items-center">
                      <span className="text-lg font-semibold">الصف الثالث</span>
                      <span className="text-primary">📚</span>
                    </div>
                  </div>
                </Card>

                {/* Congratulations Message */}
                <div className="space-y-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-6">
                  <p className="text-lg text-foreground leading-relaxed">
                    أنت الآن جزء من عائلة مسابقة سكراتشيون! 🌟
                  </p>
                  <p className="text-muted-foreground">
                    تم إرسال تأكيد التسجيل إلى مشرف المسابقة. سيتم التواصل معك قريباً بالتفاصيل الكاملة.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    استعد لإظهار مهاراتك البرمجية والإبداعية! 💪
                  </p>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => setLocation("/")}
                  className="btn-neon text-background font-bold text-lg px-8 py-6 w-full"
                >
                  العودة للرئيسية
                </Button>
              </div>
            </div>
          )}

          {/* Error State */}
          {state === 'error' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-6">
                <div className="text-6xl mb-4">❌</div>
                <h2 className="text-4xl font-bold text-destructive">
                  حدث خطأ ما!
                </h2>
                <p className="text-lg text-muted-foreground">
                  يرجى المحاولة مرة أخرى أو التواصل مع مشرف المسابقة
                </p>
                <Button
                  onClick={() => setState('form')}
                  className="btn-neon text-background font-bold text-lg px-8 py-6"
                >
                  العودة للنموذج
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
