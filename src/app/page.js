"use client";
import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    // التحويل المباشر والصحيح إلى صفحة تسجيل الدخول المتوافقة مع مجلداتك
    window.location.replace("/dashboard/login");
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400" dir="rtl">
      <p className="text-sm">جاري فتح تطبيق TaskFlow...</p>
    </div>
  );
}
