"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // استيراد قاعدة البيانات الخاصة بك
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب البيانات بشكل حي وتلقائي من Firebase بمجرد فتح الصفحة
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projectsArray = [];
      querySnapshot.forEach((doc) => {
        projectsArray.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projectsArray);
      setLoading(false);
    }, (error) => {
      console.error("خطأ في جلب المشاريع الحقيقية: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800" dir="rtl">
      {/* الشريط الجانبي (Sidebar) */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex">
        <div className="p-5">
          <div className="text-2xl font-bold text-emerald-400 mb-8 flex items-center gap-2">
            <span>⚡</span> TaskFlow
          </div>
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
              <span>📊</span> لوحة التحكم
            </a>
            <a href="/dashboard/projects" className="flex items-center gap-3 px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium transition">
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
        <div className="p-5 border-t border-slate-800">
          <button 
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              window.location.href = "/dashboard/login";
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-rose-400 hover:bg-rose-950/30 rounded-lg transition text-right"
          >
            <span>🚪</span> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* المحتوى الرئيسي للموقع */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* شريط الملاحة العلوي */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-bold text-gray-900">إدارة المشاريع 📁</h1>
          <a 
            href="/dashboard/projects/new" 
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-sm transition"
          >
            + مشروع جديد
          </a>
        </header>

        {/* مساحة العرض الخاصة بالبيانات */}
        <div className="p-8">
          {loading ? (
            <div className="text-center py-12 text-gray-500 font-medium">جاري تحميل مشاريعك الحقيقية من Firebase...</div>
          ) : projects.length === 0 ? (
            // شاشة تظهر فقط إذا كانت قاعدة بياناتك فارغة ولم تضف أي مشروع بنفسك بعد
            <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-2xl p-8 max-w-xl mx-auto mt-10">
              <p className="text-gray-500 mb-4 font-medium">لا توجد مشاريع مضافة حالياً في حسابك الحقيقي.</p>
              <a href="/dashboard/projects/new" className="inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition">
                + أضف أول مشروع حقيقي الآن
              </a>
            </div>
          ) : (
            // شبكة عرض المشاريع القادمة حية من قاعدة بياناتك
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        project.status === "مكتمل" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                        project.status === "قيد التطوير" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                        "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}>
                        {project.status || "نشط"}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600 text-lg">•••</button>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
                  </div>

                  <div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-gray-400">نسبة الإنجاز</span>
                        <span className="text-gray-900">{project.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-600 transition-all duration-500"
                          style={{ width: `${project.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
