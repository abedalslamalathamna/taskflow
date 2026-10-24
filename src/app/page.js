"use client";
import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    // التحويل إلى مسار تسجيل الدخول الجديد والصحيح مباشرة
    window.location.replace("/login");
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400" dir="rtl">
      <p className="text-sm">جاري تشغيل تطبيق TaskFlow...</p>
    </div>
  );
}
