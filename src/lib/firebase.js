// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaEvpvH2Gna68QWYIgSv8evzzutZHQE7I",
  authDomain: "taskflow-b1116.firebaseapp.com",
  projectId: "taskflow-b1116",
  storageBucket: "taskflow-b1116.firebasestorage.app",
  messagingSenderId: "815422466261",
  appId: "1:815422466261:web:3f31e87c6f2edd552a5a5c",
  measurementId: "G-8NZDK31VJB"
};

// التقييم الصحيح لمنع تكرار التهيئة
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
