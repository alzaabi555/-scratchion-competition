import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Download, RefreshCw, Users } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const listQuery = trpc.register.list.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  useEffect(() => {
    if (listQuery.data) {
      setRegistrations(listQuery.data);
      setLoading(false);
    }
  }, [listQuery.data]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Card className="p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold">غير مصرح</h1>
          <p className="text-muted-foreground">أنت لا تملك صلاحيات الوصول إلى هذه الصفحة</p>
          <Button onClick={() => setLocation("/")} className="btn-neon">
            العودة للرئيسية
          </Button>
        </Card>
      </div>
    );
  }

  const handleExportCSV = () => {
    if (registrations.length === 0) return;

    const headers = ['المدرسة', 'اسم الطالب', 'الصف', 'وقت التسجيل'];
    const rows = registrations.map(reg => [
      reg.schoolName,
      reg.studentName,
      'الصف الثالث',
      new Date(reg.createdAt).toLocaleString('ar-SA'),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const stats = {
    total: registrations.length,
    schools: new Set(registrations.map(r => r.schoolName)).size,
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
          <h1 className="text-2xl font-bold neon-glow">لوحة التحكم</h1>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="card-glow p-6">
              <div className="flex items-center gap-4">
                <Users className="w-12 h-12 text-primary" />
                <div>
                  <p className="text-muted-foreground">إجمالي التسجيلات</p>
                  <p className="text-4xl font-bold neon-glow">{stats.total}</p>
                </div>
              </div>
            </Card>
            <Card className="card-glow p-6">
              <div className="flex items-center gap-4">
                <Users className="w-12 h-12 text-secondary" />
                <div>
                  <p className="text-muted-foreground">عدد المدارس</p>
                  <p className="text-4xl font-bold neon-glow-secondary">{stats.schools}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <Button
              onClick={() => listQuery.refetch()}
              className="btn-neon text-background font-bold"
              disabled={loading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              تحديث
            </Button>
            <Button
              onClick={handleExportCSV}
              className="btn-neon text-background font-bold"
              disabled={registrations.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              تصدير CSV
            </Button>
          </div>

          {/* Registrations Table */}
          <Card className="card-glow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-right font-semibold">المدرسة</th>
                    <th className="px-6 py-4 text-right font-semibold">اسم الطالب</th>
                    <th className="px-6 py-4 text-right font-semibold">الصف</th>
                    <th className="px-6 py-4 text-right font-semibold">وقت التسجيل</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                        لا توجد تسجيلات حتى الآن
                      </td>
                    </tr>
                  ) : (
                    registrations.map((reg, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-border hover:bg-primary/5 transition"
                      >
                        <td className="px-6 py-4">{reg.schoolName}</td>
                        <td className="px-6 py-4">{reg.studentName}</td>
                        <td className="px-6 py-4">الصف الثالث</td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">
                          {new Date(reg.createdAt).toLocaleString('ar-SA')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
