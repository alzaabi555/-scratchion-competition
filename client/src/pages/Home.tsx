import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, Sparkles, Target, Users, Zap, Trophy, BookOpen, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const [expandedGoal, setExpandedGoal] = useState<number | null>(null);

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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-background" />
            </div>
            <h1 className="text-2xl font-bold neon-glow">سكراتشيون</h1>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-foreground hover:text-primary">عن المسابقة</Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">الأهداف</Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">الخطوات</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 z-10">
              <div className="space-y-4">
                <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="neon-glow">مسابقة سكراتشيون</span>
                  <br />
                  <span className="text-foreground">الإبداع والبرمجة للمستقبل</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  مسابقة تفاعلية تهدف إلى تنمية مهارات البرمجة والتفكير الإبداعي وحل المشكلات لدى الطلبة من خلال تطبيق Scratch المميز والآمن.
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={() => setLocation("/register")}
                  className="btn-neon text-background font-bold text-lg px-8 py-6"
                >
                  انضم الآن
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10 font-bold text-lg px-8 py-6"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  تعرف أكثر
                </Button>
              </div>
            </div>
            <div className="relative h-96 lg:h-full floating group cursor-pointer" onMouseEnter={(e) => {
              const video = e.currentTarget.querySelector('video');
              if (video) video.play();
            }} onMouseLeave={(e) => {
              const video = e.currentTarget.querySelector('video');
              if (video) {
                video.pause();
                video.currentTime = 0;
              }
            }}>
              {/* Video element */}
              <video 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663032449208/NzkUcyTVyCZewoYA.mp4"
                className="w-full h-full object-contain drop-shadow-2xl absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                muted
                loop
              />
              {/* Fallback image */}
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/e4P4AxqMtiqk8jLxqfHQAW/sandbox/L2QUzAZPlVJzEsyUZb9IJx-img-1_1770840920000_na1fn_c2NyYXRjaGlvbi1oZXJvLW9tYW5pLTNk.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZTRQNEF4cU10aXFrOGpMeHFmSFFBVy9zYW5kYm94L0wyUVV6QVpQbFZKekVzeVVaYjlJSngtaW1nLTFfMTc3MDg0MDkyMDAwMF9uYTFmbl9jMk55WVhSamFHbHZiaTFvWlhKdkxXOTtZVzVwTFROay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=MzWGSmCquWoNZ90Th2iliWnEznTHBdOytHzr6KIWNz82KizxzNzvNNjvczbU~-eOL-NoejliMw0sPYQhCdlGOzJtdp~M-Ui4QDepl9pa1JFdMIRoqD5QPtNHWpu-8CQWBTCSBbGq9yLkJc5jvV1b~Au~4YNj0EVJxVMu0shwXMR~m8nLx5M10Y69YVRSaw6G-whAL6SgZYnk7YKQsdMnlXVrqJbr9xcifJINVZSpq0~Y-AJxsxlyyJJLWVD9w4AneQnjFToFnxXxILhcvuHpI2f4MbeNGcck8KyBJXedrMSv0oX0FnL4dG3jlgnpHu61PD6-VjdJ7cfefBUI-j7U0Q__"
                alt="Student Programming with Scratch"
                className="w-full h-full object-contain drop-shadow-2xl group-hover:opacity-0 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="neon-glow-secondary">عن المسابقة</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              سكراتشيون هي مسابقة تهدف إلى تنمية مهارات البرمجة والتفكير الإبداعي وحل المشكلات لدى الطلبة من خلال مسابقة تفاعلية بين المدارس عن طريق تطبيق Scratch للصف الثالث، بما يعزز الابتكار والعمل الجماعي والاستعداد للمستقبل الرقمي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "الإبداع", desc: "تعزيز الفكر الإبداعي والابتكار" },
              { icon: Users, title: "التعاون", desc: "العمل الجماعي والتعاون بين الطلبة" },
              { icon: Zap, title: "التطور", desc: "الاستعداد للمستقبل الرقمي" }
            ].map((item, idx) => (
              <Card key={idx} className="card-glow text-center hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 px-4 border-t border-border">
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

          <div className="mt-12 text-center">
            <img 
              src="https://private-us-east-1.manuscdn.com/sessionFile/e4P4AxqMtiqk8jLxqfHQAW/sandbox/L2QUzAZPlVJzEsyUZb9IJx-img-4_1770840915000_na1fn_c2NyYXRjaGlvbi1jb2xsYWJvcmF0aW9uLW9tYW5pLTNk.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZTRQNEF4cU10aXFrOGpMeHFmSFFBVy9zYW5kYm94L0wyUVV6QVpQbFZKekVzeVVaYjlJSngtaW1nLTRfMTc3MDg0MDkxNTAwMF9uYTFmbl9jMk55WVhSamFHbHZiaTFqYjJ4c1lXSnZjbUYwYVc5dUxXOXRZVzVwTFROay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=jlh-yItZXq~oVa3x6SlarZcvkGMPNxl0zY6P6qdGeGLWJ9w7ZLL~StbhB3pHWrbL8owFlwoMGBuwEoGQ~9iC0gYAmmKkHFqNHSYpcpVCrzR8Orwf-2ceQfY1RugLtKXK9JWkBYIp22dAgZrWC2OojAb9bo0hw8l-pa9~3nZM3iCG5oFGC0DrW6WVkh9ItCMrWdyP8hl-rgmArs-E4ob4FdzDSfwH~e1fUAwvE0C4n3n3ZvsYvRUkTOQmZxKx3708IN0mWAHbbHsIdKCTtlQerfYFsKlUW6KUiU95MyBXArmbFs~TSqKLABJ4Q6pFnYNZ~tNcDY---kKBitLhBZp3Lw__"
              alt="Competition Process"
              className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="floating relative group cursor-pointer" onMouseEnter={(e) => {
              const video = e.currentTarget.querySelector('video');
              if (video) video.play();
            }} onMouseLeave={(e) => {
              const video = e.currentTarget.querySelector('video');
              if (video) {
                video.pause();
                video.currentTime = 0;
              }
            }}>
              {/* Video element */}
              <video 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663032449208/mAllPcHswxOUdFPT.mp4"
                className="w-full rounded-lg shadow-2xl absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                muted
                loop
              />
              {/* Fallback image */}
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/e4P4AxqMtiqk8jLxqfHQAW/sandbox/L2QUzAZPlVJzEsyUZb9IJx-img-5_1770840912000_na1fn_c2NyYXRjaGlvbi1jZWxlYnJhdGlvbi1vbWFuaS0zZA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZTRQNEF4cU10aXFrOGpMeHFmSFFBVy9zYW5kYm94L0wyUVV6QVpQbFZKekVzeVVaYjlJSngtaW1nLTVfMTc3MDg0MDkxMjAwMF9uYTFmbl9jMk55WVhSamFHbHZiaTFqWld4bFluSmhkR2x2YmkxdmJXRnVhUzB6WkEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=AX7sjEt9~qpX6VU5ectgifQ6kxPyjC5QudM7zJmQLhG07xG31cZgh5X8YfaEecLjw8bGNdJl8UJyR9wFErtAK1cKdkO6ssVzw91vBS~bRRJuq2Rni~HXto6LkZKHgWv3OfQnKTzv4YBdC9tuwOi3basMX7tvCuI1R-BQ8bqdx4vFJzaAfjBRIJGDAXkdA~NSQoXJWXZxNpHmJZqwGf3ilZcJqn2ypPpxxONih1~s~NpORj6h8ZE~2ykFe65xd75FvgxH-EKxnJX6k1U55oeNsW77dVPNfpY303k6inyA3PzsOrl9Mb~LlyXHvjhax60K~rTGulkSqGJ2CIy3mRgAZQ__"
                alt="Students Collaborating"
                className="w-full rounded-lg shadow-2xl group-hover:opacity-0 transition-opacity duration-300"
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
      <section className="py-20 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="card-glow-secondary text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold">
              هل أنت مستعد للانضمام؟
            </h2>
            <p className="text-xl text-muted-foreground">
              انضم إلى مسابقة سكراتشيون وكن جزءاً من ثورة البرمجة التعليمية
            </p>
            <div className="flex gap-4 justify-center pt-4">
            <Button 
              onClick={() => setLocation("/register")}
              className="btn-neon text-background font-bold text-lg px-8 py-6"
            >
              سجل الآن
            </Button>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10 font-bold text-lg px-8 py-6"
              onClick={() => window.location.href = 'mailto:info@scratchion.com'}
            >
              تواصل معنا
            </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 mt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">سكراتشيون</h3>
              <p className="text-muted-foreground text-sm">مسابقة تفاعلية لتنمية مهارات البرمجة والإبداع</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">الروابط</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">عن المسابقة</a></li>
                <li><a href="#" className="hover:text-primary transition">الأهداف</a></li>
                <li><a href="#" className="hover:text-primary transition">الخطوات</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">المساعدة</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">الأسئلة الشائعة</a></li>
                <li><a href="#" className="hover:text-primary transition">التواصل</a></li>
                <li><a href="#" className="hover:text-primary transition">الشروط</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">تابعنا</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Facebook</a></li>
                <li><a href="#" className="hover:text-primary transition">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2026 مسابقة سكراتشيون. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
