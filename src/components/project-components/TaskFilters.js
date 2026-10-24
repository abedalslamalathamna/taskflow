"use client";
import React from "react";

export default function TaskFilters({ searchQuery, setSearchQuery, filterPriority, setFilterPriority, filterStatus, setFilterStatus }) {
  return (
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
  );
}
