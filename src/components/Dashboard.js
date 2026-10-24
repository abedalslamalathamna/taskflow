"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; 
import { collection, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // جلب إحصائيات المشاريع الحية من الفايربيز تلقائياً
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      setProjectCount(snapshot.size); 
      setLoading(false);
    }, (error) => {
      console.error("خطأ في جلب الإحصائيات: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const stats = [
    { name: "إجمالي المشاريع الحقيقية", value: loading ? "..." : projectCount, icon: "📁", color: "bg-blue-600" },
    { name: "مهام قيد التنفيذ", value: "0", icon: "⏳", color: "bg-amber-500" },
    { name: "مهام مكتملة", value: "0", icon: "✅", color: "bg-emerald-600" },
  ];

  // دالة تسجيل الخروج ومسح الجلسة
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); 
    window.location.href = "/dashboard/login"; 
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans selection:bg-transparent" dir="rtl">
      {/* 1. الشريط الجانبي (Sidebar) - النسخة المحدثة المتوافقة مع مجلداتك */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex">
        <div className="p-5">
          <div className="text-2xl font-bold tracking-wider text-emerald-400 mb-8 flex items-center gap-2 select-none">
            <span>⚡</span> TaskFlow
          </div>
          <nav className="space-y-2">
  {/* تعديل هذا السطر تحديداً ليكون الرابط مباشر ومستقر */}
  <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium transition">
    <span>📊</span> لوحة التحكم
  </a>
  <a href="/dashboard/projects" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
    <span>📁</span> المشاريع
  </a>
  <a href="/dashboard/login" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
    <span>👤</span> الحساب الشخصي
  </a>
  <a href="/dashboard/projects/new" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
    <span>➕</span> مشروع جديد
  </a>
</nav>
        </div>
        
        {/* زر تسجيل الخروج الذكي والمحدث */}
        <div className="p-5 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-rose-400 hover:bg-rose-950/30 rounded-lg transition text-right font-medium"
          >
            <span>🚪</span> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* 2. المحتوى الرئيسي للموقع */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* شريط الملاحة العلوي */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-gray-900">أهلاً بك مجدداً في لوحة التحكم 👋</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute top-1 right-1 bg-rose-500 w-2 h-2 rounded-full"></span>
              <button className="text-xl p-1 hover:bg-gray-100 rounded-full">🔔</button>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-sm">
              <span>U</span>
            </div>
          </div>
        </header>

        {/* المساحة الخاصة بالبيانات */}
        <div className="p-8 space-y-8">
          {/* قسم بطاقات الإحصائيات الفورية القادمة من الفايربيز */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
                  <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.color} text-white flex items-center justify-center text-xl shadow-md`}>
                  {stat.icon}
                </div>
              </div>
            ))}
          </section>

          {/* لوحة ترحيبية مبسطة */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center max-w-2xl">
            <h2 className="text-lg font-bold text-gray-900 mb-2">منصة إدارة وإطلاق المشاريع الحية 🚀</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              يمكنك الآن إدارة مشاريعك المربوطة بـ Firebase بالكامل عبر التوجه إلى علامة تبويب "المشاريع" أو إضافة بطاقة جديدة فوراً.
            </p>
            <a href="/dashboard/projects/new" className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-sm transition">
              + أضف مشروعاً حقيقياً الآن
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
