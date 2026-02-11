import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Register() {
  const [, setLocation] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentPhone: "",
    schoolName: "",
    schoolEmail: "",
    schoolPhone: "",
    grade: "",
    projectTitle: "",
    projectDescription: "",
    teacherName: "",
    teacherEmail: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage for now (later will be saved to database)
    const registrations = JSON.parse(localStorage.getItem("scratchion_registrations") || "[]");
    registrations.push({
      ...formData,
      registeredAt: new Date().toISOString()
    });
    localStorage.setItem("scratchion_registrations", JSON.stringify(registrations));
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        studentName: "",
        studentEmail: "",
        studentPhone: "",
        schoolName: "",
        schoolEmail: "",
        schoolPhone: "",
        grade: "",
        projectTitle: "",
        projectDescription: "",
        teacherName: "",
        teacherEmail: ""
      });
    }, 3000);
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
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="neon-glow">نموذج التسجيل</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              انضم إلى مسابقة سكراتشيون وأظهر مهاراتك البرمجية الإبداعية
            </p>
          </div>

          {/* Success Message */}
          {submitted && (
            <Card className="card-glow-secondary mb-8 border-accent/50">
              <div className="flex items-center gap-4 text-center justify-center py-8">
                <CheckCircle2 className="w-8 h-8 text-accent animate-bounce" />
                <div>
                  <h3 className="text-xl font-bold text-accent">تم التسجيل بنجاح! ✨</h3>
                  <p className="text-muted-foreground">شكراً لتسجيلك في مسابقة سكراتشيون</p>
                </div>
              </div>
            </Card>
          )}

          {/* Registration Form */}
          <Card className="card-glow p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Student Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center text-sm font-bold">1</span>
                  بيانات الطالب
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="studentName" className="text-foreground font-semibold">اسم الطالب *</Label>
                    <Input
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="أدخل اسمك الكامل"
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentEmail" className="text-foreground font-semibold">البريد الإلكتروني *</Label>
                    <Input
                      id="studentEmail"
                      name="studentEmail"
                      type="email"
                      value={formData.studentEmail}
                      onChange={handleChange}
                      placeholder="بريدك الإلكتروني"
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentPhone" className="text-foreground font-semibold">رقم الهاتف *</Label>
                    <Input
                      id="studentPhone"
                      name="studentPhone"
                      type="tel"
                      value={formData.studentPhone}
                      onChange={handleChange}
                      placeholder="رقم هاتفك"
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade" className="text-foreground font-semibold">الصف الدراسي *</Label>
                    <Select value={formData.grade} onValueChange={handleSelectChange}>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue placeholder="اختر صفك الدراسي" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="grade3">الصف الثالث</SelectItem>
                        <SelectItem value="grade4">الصف الرابع</SelectItem>
                        <SelectItem value="grade5">الصف الخامس</SelectItem>
                        <SelectItem value="grade6">الصف السادس</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* School Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary text-background flex items-center justify-center text-sm font-bold">2</span>
                  بيانات المدرسة
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName" className="text-foreground font-semibold">اسم المدرسة *</Label>
                    <Input
                      id="schoolName"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      placeholder="اسم مدرستك"
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schoolEmail" className="text-foreground font-semibold">بريد المدرسة</Label>
                    <Input
                      id="schoolEmail"
                      name="schoolEmail"
                      type="email"
                      value={formData.schoolEmail}
                      onChange={handleChange}
                      placeholder="بريد المدرسة الإلكتروني"
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schoolPhone" className="text-foreground font-semibold">هاتف المدرسة</Label>
                    <Input
                      id="schoolPhone"
                      name="schoolPhone"
                      type="tel"
                      value={formData.schoolPhone}
                      onChange={handleChange}
                      placeholder="هاتف المدرسة"
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Project Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-accent text-background flex items-center justify-center text-sm font-bold">3</span>
                  بيانات المشروع
                </h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectTitle" className="text-foreground font-semibold">عنوان المشروع *</Label>
                    <Input
                      id="projectTitle"
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={handleChange}
                      placeholder="أدخل عنوان مشروعك البرمجي"
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectDescription" className="text-foreground font-semibold">وصف المشروع *</Label>
                    <Textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      placeholder="اشرح فكرة مشروعك والمهارات المستخدمة..."
                      required
                      rows={5}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Teacher Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center text-sm font-bold">4</span>
                  بيانات المعلم/المشرف
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="teacherName" className="text-foreground font-semibold">اسم المعلم/المشرف *</Label>
                    <Input
                      id="teacherName"
                      name="teacherName"
                      value={formData.teacherName}
                      onChange={handleChange}
                      placeholder="اسم المعلم المشرف"
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacherEmail" className="text-foreground font-semibold">بريد المعلم الإلكتروني *</Label>
                    <Input
                      id="teacherEmail"
                      name="teacherEmail"
                      type="email"
                      value={formData.teacherEmail}
                      onChange={handleChange}
                      placeholder="بريد المعلم الإلكتروني"
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="btn-neon text-background font-bold text-lg px-8 py-6 flex-1"
                >
                  تسجيل المشاركة
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 font-bold text-lg px-8 py-6"
                  onClick={() => setLocation("/")}
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </Card>

          {/* Info Box */}
          <Card className="card-glow-secondary mt-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">ملاحظات مهمة:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>تأكد من ملء جميع الحقول المطلوبة بشكل صحيح</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>سيتم التواصل معك على البريد الإلكتروني المسجل</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>يجب أن يكون المشروع من إنتاج الطالب بنفسه</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>الموعد النهائي للتسجيل سيتم إعلانه لاحقاً</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
