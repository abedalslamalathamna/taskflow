"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase"; // استيراد قاعدة البيانات التي أنشأناها
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function NewProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("نشط");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // إرسال البيانات وحفظها في جدول (Collection) يسمى projects داخل Firebase
      await addDoc(collection(db, "projects"), {
        title: title,
        description: description,
        status: status,
        progress: 0, // المشروع يبدأ بنسبة 0% تلقائياً
        createdAt: serverTimestamp() // وقت إنشاء المشروع
      });

      // توجيه المستخدم لصفحة عرض المشاريع بعد الحفظ بنجاح
      window.location.href = "/dashboard/projects";
    } catch (error) {
      console.error("حدث خطأ أثناء حفظ المشروع: ", error);
      alert("فشل حفظ المشروع، يرجى التحقق من إعدادات Firebase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800" dir="rtl">
      {/* شريط التنقل الجانبي */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex">
        <div className="p-5">
          <div className="text-2xl font-bold text-emerald-400 mb-8 flex items-center gap-2">
            <span>⚡</span> TaskFlow
          </div>
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
              <span>📊</span> لوحة التحكم
            </a>
            <a href="/dashboard/projects" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
              <span>📁</span> المشاريع
            </a>
            <a href="/dashboard/login" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
              <span>👤</span> الحساب الشخصي
            </a>
            <a href="/dashboard/projects/new" className="flex items-center gap-3 px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium transition">
              <span>➕</span> مشروع جديد
            </a>
          </nav>
        </div>
        <div className="p-5 border-t border-slate-800">
          <a href="/dashboard/login" className="flex items-center gap-3 px-4 py-2 text-rose-400 hover:bg-rose-950/30 rounded-lg transition">
            <span>🚪</span> تسجيل الخروج
          </a>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-bold text-gray-900">إضافة مشروع جديد ➕</h1>
        </header>

        <div className="p-8 max-w-2xl">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 block">اسم المشروع</label>
                <input
                  type="text"
                  required
                  disabled={loading}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: تطوير تطبيق الجوال"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition disabled:bg-gray-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 block">وصف المشروع</label>
                <textarea
                  required
                  rows="4"
                  disabled={loading}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اكتب تفاصيل وأهداف المشروع هنا..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-none disabled:bg-gray-100"
                ></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 block">حالة البدء</label>
                <select
                  disabled={loading}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                >
                  <option value="نشط">نشط (بدء العمل فوراً)</option>
                  <option value="قيد التطوير">قيد التطوير والتخطيط</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-100 justify-end">
                <a href="/dashboard/projects" className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition">إلغاء</a>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-sm transition disabled:bg-emerald-400"
                >
                  {loading ? "جاري الحفظ..." : "حفظ المشروع"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
