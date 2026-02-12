import { Card } from "@/components/ui/card";
import { ChevronDown, Sparkles, Target, Users, Zap, Trophy, BookOpen, Lightbulb } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const [expandedGoal, setExpandedGoal] = useState<number | null>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);

  const goals = [
    {
      id: 1,
      title: "نشر ثقافة البرمجة",
      description: "نشر ثقافة البرمجة والتفكير المنطقي بين طلبة المدارس بطريقة ممتعة وتفاعلية",
      icon: Lightbulb,
      color: "from-primary to-secondary"
    },
    {
      id: 2,
      title: "التحول الرقمي",
      description: "دعم توجه المدارس نحو التحول الرقمي والاستعداد للمستقبل",
      icon: Zap,
      color: "from-secondary to-accent"
    },
    {
      id: 3,
      title: "تعزيز Scratch",
      description: "تعزيز استخدام تطبيق Scratch كأداة تعليمية سهلة وآمنة للطلبة",
      icon: Target,
      color: "from-accent to-primary"
    },
    {
      id: 4,
      title: "اكتشاف المواهب",
      description: "اكتشاف المواهب البرمجية المبكرة وتنميتها لدى الطلاب",
      icon: Sparkles,
      color: "from-primary to-accent"
    },
    {
      id: 5,
      title: "مهارات التفكير",
      description: "تنمية مهارات التفكير المنطقي وحل المشكلات والتخطيط والتحليل",
      icon: BookOpen,
      color: "from-secondary to-primary"
    },
    {
      id: 6,
      title: "بناء الثقة",
      description: "بناء ثقة الطلاب بأنفسهم وقدرتهم على إنتاج مشاريع تقنية متقدمة",
      icon: Trophy,
      color: "from-accent to-secondary"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "الإعلان عن المسابقة",
      description: "نشر المسابقة بين طلبة مدرسة الفردوس وطلبة مدارس الحلقة الأولى"
    },
    {
      number: 2,
      title: "التدريب والاختيار",
      description: "تدريب الطلبة واختيار طالب واحد فقط من كل مدرسة"
    },
    {
      number: 3,
      title: "تحديد الموعد",
      description: "تحديد موعد لإجراء المسابقة والتي ستقام في مدرسة الفردوس (1-4)"
    },
    {
      number: 4,
      title: "توضيح الآلية",
      description: "توضيح آليه تنفيذ المسابقة من قبل مشرفة المادة"
    },
    {
      number: 5,
      title: "إعلان النتائج",
      description: "إعلان النتائج وتكريم الفائزين"
    }
  ];

  // Scroll-based video playback logic
  useEffect(() => {
    const handleScroll = () => {
      const video1 = video1Ref.current;
      const video2 = video2Ref.current;
      const video3 = video3Ref.current;

      if (video1) {
        const rect1 = video1.getBoundingClientRect();
        const isInView1 = rect1.top < window.innerHeight && rect1.bottom > 0;
        if (isInView1) {
          video1.play().catch(() => {});
        } else {
          video1.pause();
          video1.currentTime = 0;
        }
      }

      if (video2) {
        const rect2 = video2.getBoundingClientRect();
        const isInView2 = rect2.top < window.innerHeight && rect2.bottom > 0;
        if (isInView2) {
          video2.play().catch(() => {});
        } else {
          video2.pause();
          video2.currentTime = 0;
        }
      }

      if (video3) {
        const rect3 = video3.getBoundingClientRect();
        const isInView3 = rect3.top < window.innerHeight && rect3.bottom > 0;
        if (isInView3) {
          video3.play().catch(() => {});
        } else {
          video3.pause();
          video3.currentTime = 0;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video 1 - الطالب الأول */}
            <div className="floating">
              <video
                ref={video1Ref}
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663032449208/mAllPcHswxOUdFPT.mp4"
                className="w-full rounded-lg shadow-2xl"
                muted
                loop
                playsInline
              />
            </div>
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold">
                <span className="neon-glow">مسابقة سكراتشيون</span>
                <br />
                <span className="neon-glow-secondary">الإبداع والبرمجة للمستقبل</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                مسابقة تفاعلية تهدف إلى تنمية مهارات البرمجة والتفكير الإبداعي وحل المشكلات لدى الطلبة من خلال تطبيق Scratch للصف الثالث، بما يعزز الابتكار والعمل الجماعي والاستعداد للمستقبل الرقمي.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setLocation("/register")}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-background font-bold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 neon-glow"
                >
                  انضم الآن
                </button>
                <button
                  onClick={() => document.getElementById("goals")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/10 transition-all duration-300"
                >
                  تعرف أكثر
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section id="goals" className="py-20 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="neon-glow">أهداف المسابقة</span>
            </h2>
            <p className="text-lg text-muted-foreground">ستة أهداف رئيسية لتحقيق رؤيتنا التعليمية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => {
              const IconComponent = goal.icon;
              return (
                <Card
                  key={goal.id}
                  className="card-glow-secondary cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={() => setExpandedGoal(expandedGoal === goal.id ? null : goal.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${goal.color}`}>
                      <IconComponent className="w-6 h-6 text-background" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{goal.title}</h3>
                      {expandedGoal === goal.id && (
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {goal.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="neon-glow-accent">خطوات تنفيذ المسابقة</span>
            </h2>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="card-glow text-center hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 text-lg font-bold text-background pulse-glow">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/4 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Video 2 - الولد والبنت */}
          <div className="mt-12 text-center">
            <video
              ref={video2Ref}
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663032449208/mAllPcHswxOUdFPT.mp4"
              className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video 3 - الاحتفال */}
            <div className="floating">
              <video
                ref={video3Ref}
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663032449208/kViSQGIfocfxFHQZ.mp4"
                className="w-full rounded-lg shadow-2xl"
                muted
                loop
                playsInline
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                <span className="neon-glow-secondary">العمل الجماعي والابتكار</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                تهدف مسابقة سكراتشيون إلى تعزيز روح التعاون والعمل الجماعي بين الطلبة، حيث يتعلمون كيفية العمل معاً لحل المشاكل والتوصل إلى حلول إبداعية.
              </p>
              <ul className="space-y-3">
                {[
                  "تنمية مهارات التواصل والتعاون",
                  "تعزيز الثقة بالنفس والقدرات الشخصية",
                  "اكتشاف المواهب الخفية لدى الطلبة",
                  "بناء جيل واعٍ بالتقنية ومواكب للمستقبل"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-border bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="neon-glow">هل أنت مستعد للانضمام؟</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            سجل الآن في مسابقة سكراتشيون وأظهر مهاراتك البرمجية. انضم إلى آلاف الطلاب الذين يستكشفون عالم البرمجة والإبداع.
          </p>
          <button
            onClick={() => setLocation("/register")}
            className="px-10 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-background font-bold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 neon-glow"
          >
            سجل الآن 🚀
          </button>
        </div>
      </section>
    </div>
  );
}
