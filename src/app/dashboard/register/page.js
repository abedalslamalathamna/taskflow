"use client";
import React, { useState } from "react";
import { auth } from "@/lib/firebase"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setErrorMsg("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name.trim()
        });
      }

      alert("تم إنشاء حسابك بنجاح! جاري نقلك لصفحة تسجيل الدخول.");
      window.location.href = "/dashboard/login";
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("هذا البريد الإلكتروني مسجل ومستخدم بالفعل!");
      } else if (error.code === "auth/weak-password") {
        setErrorMsg("كلمة المرور ضعيفة جداً! يجب أن تتكون من 6 خانات أو أكثر.");
      } else {
        setErrorMsg("فشل الاتصال: تأكد من إعدادات الفايربيز أو الإنترنت.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="text-4xl font-extrabold text-emerald-400 flex items-center justify-center gap-2">
            <span>⚡</span> TaskFlow
          </div>
          <h2 className="text-xl font-bold text-white mt-4">إنشاء حساب جديد</h2>
          <p className="text-sm text-slate-400">سجل الآن لتتمكن خوادم الفايربيز من توثيق دخولك.</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-300 block">الاسم الكامل</label>
            <input
              type="text"
              required
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="عبد السلام"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition text-right"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-300 block">البريد الإلكتروني</label>
            <input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500 text-left"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-300 block">كلمة المرور</label>
            <input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500 text-left"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب وتفعيله"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800/60">
          <p className="text-xs text-slate-400 font-medium">
            لديك حساب بالفعل؟{" "}
            <a href="/dashboard/login" className="text-emerald-400 hover:text-emerald-300 font-bold transition">تسجيل الدخول</a>
          </p>
        </div>

      </div>
    </div>
  );
}
