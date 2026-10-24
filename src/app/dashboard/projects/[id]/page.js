"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // حقول إضافة مهمة
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("متوسطة");
  const [taskStatus, setTaskStatus] = useState("To Do");

  // حقول الفلترة والبحث
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("الكل");
  const [filterStatus, setFilterStatus] = useState("الكل");

  useEffect(() => {
    if (!id) return;

    getDoc(doc(db, "projects", id)).then((docSnap) => {
      if (docSnap.exists()) setProject(docSnap.data());
    });

    const unsubscribe = onSnapshot(query(collection(db, "projects", id, "tasks"), orderBy("createdAt", "desc")), (snapshot) => {
      const tasksArray = [];
      snapshot.forEach((doc) => {
        tasksArray.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksArray);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    try {
      await addDoc(collection(db, "projects", id, "tasks"), {
        title: taskTitle.trim(),
        priority: taskPriority,
        status: taskStatus,
        createdAt: new Date()
      });
      setTaskTitle("");
      alert("تمت إضافة المهمة بنجاح حقيقي!");
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === "الكل" || task.priority === filterPriority;
    const matchesStatus = filterStatus === "الكل" || task.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  if (loading) return <div className="text-center py-20 text-gray-500">جاري التحميل الفوري من Firebase...</div>;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800" dir="rtl">
      {/* القائمة الجانبية */}
      <aside className={`w-64 bg-slate-900 text-white flex flex-col fixed md:static inset-y-0 right-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 transition-transform duration-200`}>
        <div className="p-5">
          <div className="text-2xl font-bold text-emerald-400 mb-8 flex justify-between items-center">
            <span>⚡ TaskFlow</span>
            <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>✕</button>
          </div>
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">📊 لوحة التحكم</a>
            <a href="/dashboard/projects" className="flex items-center gap-3 px-4 py-3 bg-emerald-600 text-white rounded-lg">📁 المشاريع</a>
          </nav>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="text-2xl md:hidden block" onClick={() => setIsSidebarOpen(true)}>☰</button>
            <h1 className="text-lg font-bold text-gray-900">{project?.title || "تفاصيل المشروع"}</h1>
          </div>
          <a href={`/dashboard/projects/${id}/settings`} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition">
            ⚙️ إعدادات المشروع والأعضاء
          </a>
        </header>

        <div className="p-4 md:p-8 space-y-6">
          {/* قسم الفلاتر والبحث الحي (US-07) */}
          <section className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="🔍 ابحث عن مهمة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
            />
            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none">
              <option value="الكل">كل الأولويات</option>
              <option value="عالية">أولوية عالية</option>
              <option value="متوسطة">أولوية متوسطة</option>
              <option value="منخفضة">أولوية منخفضة</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none">
              <option value="الكل">كل الحالات</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </section>

          {/* محرك ونموذج إنشاء مهمة جديدة (US-05) */}
          <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4">➕ إضافة مهمة عمل جديدة للمشروع</h2>
            <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2 space-y-1">
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="اكتب عنوان المهمة المطلوبة..."
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none">
                  <option value="عالية">عالية</option>
                  <option value="متوسطة">متوسطة</option>
                  <option value="منخفضة">منخفضة</option>
                </select>
                <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none">
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-sm transition">
                إضافة المهمة
              </button>
            </form>
          </section>

          {/* لوحة عرض قائمة المهام (Task List) المتجاوبة (US-06) */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-sm font-bold text-gray-900">قائمة المهام القائمة الحية ({filteredTasks.length})</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm">لا توجد مهام مضافة حالياً لهذا المشروع.</div>
              ) : (
                filteredTasks.map((task) => (
                  <div key={task.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition">
                    <p className="text-sm font-semibold text-gray-900">{task.title}</p>
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${task.priority === "عالية" ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"}`}>{task.priority}</span>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${task.status === "Done" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-600"}`}>{task.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
