"use client";
import React, { useState } from "react";

export default function TaskForm({ onCreateTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("متوسطة");
  const [taskStatus, setTaskStatus] = useState("To Do");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    onCreateTask({ title: taskTitle.trim(), priority: taskPriority, status: taskStatus });
    setTaskTitle("");
  };

  return (
    <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h2 className="text-sm font-bold text-gray-900 mb-4">➕ إضافة مهمة عمل جديدة</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
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
  );
}
