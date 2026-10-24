"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";

export default function SettingsPage() {
  const { id } = useParams();
  const [memberEmail, setMemberEmail] = useState("");
  const [team, setTeam] = useState(["owner@taskflow.com", "developer@taskflow.com"]);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!memberEmail.trim()) return;
    setTeam([...team, memberEmail.trim()]);
    alert(`تمت إضافة العضو ${memberEmail} بنجاح إلى فريق عمل المشروع!`);
    setMemberEmail("");
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800" dir="rtl">
      {/* القائمة الجانبية المستقرة */}
      <aside className="w-64 bg-slate-900 text-white p-5 space-y-8 hidden md:block">
        <div className="text-2xl font-bold text-emerald-400">⚡ TaskFlow</div>
        <nav className="space-y-2">
          <a href="/dashboard" className="block px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">📊 لوحة التحكم</a>
          <a href="/dashboard/projects" className="block px-4 py-3 bg-emerald-600 text-white rounded-lg">📁 المشاريع</a>
        </nav>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
        <header className="flex justify-between items-center pb-4 border-b border-gray-200">
          <div>
            {/* رابط العودة المباشر الدقيق */}
            <a href={`/dashboard/projects/${id}`} className="text-xs text-emerald-600 hover:underline font-bold">← العودة لتفاصيل المشروع</a>
            <h1 className="text-xl font-bold text-gray-900 mt-2">⚙️ إعدادات المشروع وفريق العمل (Membership)</h1>
          </div>
        </header>

        {/* نموذج إضافة عضو جديد بالبريد الإلكتروني - US-04 */}
        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm max-w-xl">
          <h2 className="text-sm font-bold text-gray-900 mb-2">👥 دعوة عضو جديد للمشروع</h2>
          <p className="text-xs text-gray-500 mb-4">اكتب البريد الإلكتروني للشخص الذي تود مشاركته في إدارة مهام هذا المشروع.</p>
          <form onSubmit={handleAddMember} className="flex gap-3">
            <input
              type="email"
              required
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
              placeholder="user@example.com"
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-left"
            />
            <button type="submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-sm transition">
              إضافة العضو
            </button>
          </form>
        </section>

        {/* قائمة أعضاء الفريق الحاليين بالمشروع */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden max-w-xl">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-sm font-bold text-gray-900">أعضاء الفريق الحاليين ({team.length})</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {team.map((email, idx) => (
              <div key={idx} className="p-4 flex justify-between items-center text-sm font-medium">
                <span className="text-gray-900 font-mono">{email}</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">{idx === 0 ? "المالك" : "عضو"}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
