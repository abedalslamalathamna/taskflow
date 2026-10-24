/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    eslint: {
        ignoreDuringBuilds: true, 
    },
    // تفعيل هذا الخيار يسمح بتصدير الصفحات حتى لو كانت تحتوي على مسارات ديناميكية
    images: {
        unoptimized: true, // مطلوب عند استخدام output: export
    },
};

export default nextConfig;
