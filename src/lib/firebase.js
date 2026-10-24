import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // استيراد خدمة التوثيق المطلوبة للتسجيل

const firebaseConfig = {
  apiKey: "AIzaSyDaEvpvH2Gna68QWYIgSv8evzzutZHQE7I",
  authDomain: "taskflow-b1116.firebaseapp.com",
  projectId: "taskflow-b1116",
  storageBucket: "taskflow-b1116.firebasestorage.app",
  messagingSenderId: "815422466261",
  appId: "1:815422466261:web:3f31e87c6f2edd552a5a5c",
  measurementId: "G-8NZDK31VJB"
};

// منع تكرار بناء التطبيق عند عمل تحديث تلقائي (Refresh) في Next.js
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// تصدير الـ auth لتقرأه صفحة التسجيل بشكل صحيح
export const auth = getAuth(app);
