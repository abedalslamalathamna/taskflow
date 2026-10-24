// src/app/layout.js
import "./globals.css";

export const metadata = { 
  title: "TaskFlow", 
  description: "Project and task management" 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
