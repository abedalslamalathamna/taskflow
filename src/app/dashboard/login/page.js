"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase"; 
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("a409763364@gmail.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // دالة تسجيل الدخول بالبريد وكلمة المرور
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setErrorMessage("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      } else {
        setErrorMessage("حدث خطأ أثناء الاتصال بالخادم، يرجى المحاولة لاحقاً.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // دالة تسجيل الدخول عبر جوجل
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      // التوجيه التلقائي إلى لوحة التحكم بعد نجاح الدخول
      router.push("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      if (error.code !== "auth/popup-closed-by-user") {
        setErrorMessage("حدث خطأ أثناء تسجيل الدخول بواسطة جوجل.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        
        {/* الشعار وعنوان الصفحة */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-emerald-500 flex items-center justify-center gap-1">
            TaskFlow <span className="text-amber-500">⚡</span>
          </h1>
          <h2 className="text-xl font-bold text-gray-200 mt-4">تسجيل الدخول إلى حسابك</h2>
          <p className="text-sm text-gray-400 mt-1">ادخل بيانات حسابك للبدء</p>
        </div>

        {/* عرض الأخطاء داخل الواجهة */}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">
            {errorMessage}
          </div>
        )}

        {/* نموذج تسجيل الدخول */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2 text-right">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left"
              dir="ltr"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2 text-right">كلمة المرور</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left"
              dir="ltr"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-bold text-white transition ${
              isLoading 
                ? "bg-emerald-700/50 text-gray-300 cursor-not-allowed" 
                : "bg-emerald-600 hover:bg-emerald-500"
            }`}
          >
            {isLoading ? "جاري التحقق..." : "تسجيل الدخول"}
          </button>
        </form>

        {/* فاصل خطي (or continue with) */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-xs font-medium">أو المتابعة عبر</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        {/* زر تسجيل الدخول بجوجل المتناسق مع التصميم المظلم */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-transparent border border-gray-700 hover:border-gray-600 rounded-xl font-medium text-gray-200 hover:bg-gray-800/50 transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.817.955 15.06 0 12 0 7.354 0 3.318 2.654 1.34 6.545l3.926 3.22z"
            />
            <path
              fill="#4285F4"
              d="M23.455 12.273c0-.818-.073-1.609-.209-2.373H12v4.5h6.418a5.487 5.487 0 0 1-2.382 3.6l3.714 2.873c2.173-2.005 3.71-4.945 3.71-8.6z"
            />
            <path
              fill="#FBBC05"
              d="M5.266 14.235L1.34 17.455A11.94 11.94 0 0 0 12 24c3.06 0 5.818-.955 7.75-2.618l-3.714-2.873a7.127 7.127 0 0 1-4.036 1.127 7.077 7.077 0 0 1-6.734-4.855z"
            />
            <path
              fill="#34A853"
              d="M12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.817.955 15.06 0 12 0 7.354 0 3.318 2.654 1.34 6.545l3.926 3.22A7.077 7.077 0 0 1 12 4.909z"
            />
          </svg>
          <span>متابعة باستخدام Google</span>
        </button>

        <div className="text-center mt-6">
          <button 
            onClick={() => router.push("/register")}
            className="text-sm text-gray-500 hover:text-emerald-400 transition"
          >
            ليس لديك حساب؟ أنشئ حساباً جديداً
          </button>
        </div>

      </div>
    </div>
  );
}
